import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../../src/components/ui/form";
import {Input} from "../../src/components/ui/input";
import LoadingButton from "../../src/components/LoadingButton";
import {Button} from "../../src/components/ui/button";
import { userType } from "../../src/types/types";
import { useEffect } from "react";

const formSchema  = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "name is required"),
    address: z.string().min(1, "address is required"),
    city: z.string().min(1, "city is required"),
    country: z.string().min(1, "country is required"),
});


type UserFormData = z.infer<typeof formSchema>;


type Props = {
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  currentUser:userType
}

const UserProfileForm = ({isLoading, onSave,currentUser}: Props) => {

    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues:currentUser
    });

    useEffect(()=>{
        form.reset(currentUser)
    },[currentUser,form])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} 
            className="space-y-4 bg-gray-50 rounded-lg md:p-10">
                <div>
                    <h2 className="text-2xl font-bold">User Profile Form</h2>
                    <FormDescription>
                        View and change your profile info
                    </FormDescription>
                </div>
                <FormField control={form.control} 
                    name="email" 
                    render={
                    ({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} disabled className="bg-white"/>
                            </FormControl>
                        </FormItem>
                    ) 
                } />
                <FormField control={form.control} 
                    name="name" 
                    render={
                    ({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ) 
                } />
                <div className="flex flex-col md:flex-row gap-4">
                    <FormField control={form.control} 
                        name="address" 
                        render={
                        ({field}) => (
                            <FormItem className="flex-1">
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        ) 
                    } />
                    <FormField control={form.control} 
                        name="city" 
                        render={
                        ({field}) => (
                            <FormItem className="flex-1">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        ) 
                        } />
                    <FormField control={form.control} 
                    name="country" 
                    render={
                    ({field}) => (
                        <FormItem className="flex-1">
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ) 
                } />
                </div>
                <div style={{marginTop:"6px"}}>  
                    {
                        isLoading ? (<LoadingButton />) : (<Button type="submit" className="bg-orange-500">Submit</Button>)
                    }
                </div>
            </form>
        </Form>
    );
}

export default UserProfileForm;
