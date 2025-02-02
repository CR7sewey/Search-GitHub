import React from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'

type SearchFormProps = { userName: string, setUserName: React.Dispatch<React.SetStateAction<string>> }

export const SearchForm = ({ userName, setUserName }: SearchFormProps) => {

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = (new FormData(e.currentTarget)).get("searchuser") as string;
        setUserName(data)
    }
    return (
        <form className="grid w-full max-w-sm items-center gap-1.5" onSubmit={handleSearch}>
            <Label htmlFor='searchuser'>Username</Label>
            <div>
                <Input type='search' placeholder='github username' id='searchuser' name='searchuser' defaultValue={userName} required />
                <Button type='submit'>Search</Button>
            </div>
        </form >
    )
}
