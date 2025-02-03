import { useQuery } from '@apollo/client';
import { GET_USER } from '@/queries';
import { UserData } from '@/types';
import { Button } from './ui/button';
import { Link } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

type UserProfileProps = {
    userName: string;
};

export const UserProfile = ({ userName }: UserProfileProps) => {
    const { loading, error, data } = useQuery<UserData>(GET_USER, {
        variables: { login: userName },
    });
    if (loading) return <div>Loading...</div>;
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
        </div>
    );
};

