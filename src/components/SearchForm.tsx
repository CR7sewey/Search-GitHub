import React from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast'
import { Console } from 'console'

type SearchFormProps = { userName: string, setUserName: React.Dispatch<React.SetStateAction<string>> }

export const SearchForm = ({ userName, setUserName }: SearchFormProps) => {
    const { toast } = useToast();
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const dataConverted = Object.fromEntries(data);
        console.log(dataConverted)
        if (dataConverted["searchuser"].toString().trim() === "") {
            console.log("UIIII");
            toast({ description: "Please introduce a username..." });
            return;
        }

        setUserName(data.get("searchuser") as string);
    }

    return (
        <form className="flex items-center gap-x-2 w-full lg:w-1/3 mb-8" onSubmit={handleSearch}>
            <Label htmlFor='searchuser' className='sr-only'>Username</Label>

            <Input type='search' placeholder='github username' id='searchuser' name='searchuser' defaultValue={userName} />
            <Button type='submit'>Search</Button>

        </form >
    )
}
