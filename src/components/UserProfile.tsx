import { useQuery } from '@apollo/client';
import { GET_USER } from '@/queries';
import { UserData } from '@/types';
import { Button } from './ui/button';
import { Link } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { mostForkedRepos, mostStarredRepos, mostUsedLanguages } from '@/utils/utils';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import Loading from './Loading';

type UserProfileProps = {
    userName: string;
};

export const UserProfile = ({ userName }: UserProfileProps) => {
    const { loading, error, data } = useQuery<UserData>(GET_USER, {
        variables: { login: userName },
    });
    if (loading) return <div><Loading /></div>;
    if (error) return <h2 className='text-xl'>{error.message}</h2>;
    if (!data) return <h2 className='text-xl'>User Not Found.</h2>;

    const {
        avatarUrl,
        name,
        bio,
        url,
        repositories,
        followers,
        following,
        gists,
    } = data.user;

    const stats = [
        { label: "Total Repositories", value: repositories.totalCount },
        { label: "Followers", value: followers.totalCount },
        { label: "Following", value: following.totalCount },
        { label: "Gists", value: gists.totalCount },
    ];

    const mostUsedLanguagesArray: Array<{
        language: string;
        count: number;
    }> = mostUsedLanguages(repositories.nodes);
    const popularRepos: {
        repo: string;
        count: number;
    }[] = mostStarredRepos(repositories.nodes);
    console.log(popularRepos)

    const mostForkedReposA = mostForkedRepos(repositories.nodes);

    const chartConfig1 = {
        language: {
            label: 'Language',
            color: '#2563eb',
        },
    } satisfies ChartConfig;

    // Configuration for the chart's styling and labels
    const chartConfig2 = {
        repo: {
            label: 'Repository',
            color: '#e11c47', // Red color for the bars
        },
    } satisfies ChartConfig;

    const chartConfig3 = {
        repo: {
            label: 'Repository',
            color: '#facd12',
        },
    } satisfies ChartConfig;

    return (
        <div>
            <Card className="w-full lg:w-1/2 mb-8">
                <CardHeader className='flex-row gap-x-8 items-center'>
                    <img src={avatarUrl} alt={name} width={120}
                        height={120} className='rounded-sm' />

                    <div className='flex flex-col gap-y-2'>
                        <CardContent className="p-0">

                            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
                            <CardDescription className="text-sm text-gray-500">{bio}</CardDescription>
                            <Button className="w-1/2 mt-2" size='sm' asChild>
                                <a href={url} target='_blank' rel='noreferrer'>Follow</a>
                            </Button>
                        </CardContent>
                    </div>
                </CardHeader>
            </Card>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 mb-8 '>                {stats.map((stat, index) => (
                <Card key={index}>
                    <div className='flex flex-row justify-between items-center p-6'>
                        <CardTitle>{stat.label}</CardTitle>
                        <CardDescription>{stat.value}</CardDescription>
                    </div>
                </Card>
            ))}
            </div>
            <div className='grid md:grid-cols-2 gap-4'>

                <div>
                    <h2 className='text-2xl font-semibold text-center mb-4'>
                        Used Languages
                    </h2>
                    <ChartContainer config={chartConfig1} className='h-100 w-full'>
                        {/* BarChart is the main container for the bar chart visualization */}
                        {/* accessibilityLayer adds ARIA labels for better screen reader support */}
                        <BarChart accessibilityLayer data={mostUsedLanguagesArray}>
                            {/* CartesianGrid adds horizontal guide lines */}
                            <CartesianGrid vertical={false} />

                            {/* XAxis configures the horizontal axis showing language names */}
                            <XAxis
                                dataKey='language'
                                tickLine={false} // Removes tick marks
                                tickMargin={10} // Adds spacing between labels and axis
                            />

                            {/* YAxis configures the vertical axis showing count values */}
                            <YAxis dataKey='count' />

                            {/* ChartTooltip shows details when hovering over bars */}
                            <ChartTooltip content={<ChartTooltipContent />} />

                            {/* Bar component defines how each data point is rendered */}
                            {/* Uses CSS variable for color and adds rounded corners */}
                            <Bar dataKey='count' fill='var(--color-language)' radius={4} />
                        </BarChart>
                    </ChartContainer>
                </div>
                <div>
                    <h2 className='text-2xl font-semibold text-center mb-4'>Popular Repos</h2>
                    {/* ChartContainer: Custom wrapper component that handles responsive sizing and theme */}
                    <ChartContainer config={chartConfig2} className='h-100 w-full'>
                        {/* BarChart: Main chart component from recharts */}
                        {/* accessibilityLayer adds ARIA labels for better screen reader support */}
                        <BarChart accessibilityLayer data={popularRepos}>
                            {/* CartesianGrid: Adds horizontal guide lines (vertical disabled) */}
                            <CartesianGrid vertical={false} />

                            {/* XAxis: Horizontal axis showing repository names */}
                            {/* tickFormatter truncates long repository names to 10 characters */}
                            <XAxis
                                dataKey='repo'
                                tickLine={false}
                                tickMargin={10}
                                tickFormatter={(value) => value.slice(0, 10)}
                            />

                            {/* YAxis: Vertical axis showing star counts */}
                            <YAxis dataKey='stars' />

                            {/* ChartTooltip: Custom tooltip component that appears on hover */}
                            {/* ChartTooltipContent: Renders the actual content inside the tooltip */}
                            <ChartTooltip content={<ChartTooltipContent />} />

                            {/* Bar: The actual bar elements of the chart */}
                            {/* fill uses CSS variable for consistent theming */}
                            {/* radius adds rounded corners to the bars */}
                            <Bar dataKey='stars' fill='var(--color-repo)' radius={4} />
                        </BarChart>
                    </ChartContainer>
                </div>
                <div>
                    <h2 className='text-2xl font-semibold text-center mb-4'>Forked Repos</h2>
                    <ChartContainer config={chartConfig3} className='h-100 w-full'>
                        <BarChart accessibilityLayer data={mostForkedReposA}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey='repo'
                                tickLine={true}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 10)}
                            />
                            <YAxis dataKey='count' />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey='count' fill='var(--color-repo)' radius={4} />
                        </BarChart>
                    </ChartContainer>
                </div>
            </div>
        </div>
    );
};

