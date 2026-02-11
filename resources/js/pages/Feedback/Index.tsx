import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, MoreHorizontalIcon } from 'lucide-react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Your Feedbacks',
        href: '/feedback',
    },
];

interface PageProps {
    flash: {
        success?: string;
        error?: string;
    };

    feedbacks: {
        id: number;
        title: string;
        feedback: string;
    }[];
}

export default function Index() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        feedback: '',
    });
    const [open, setOpen] = useState(false);

    const { flash, feedbacks } = usePage<pageProps>().props;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        post('/feedback', {
            onSuccess: () => {
                setOpen(false);
                setData({ title: '', feedback: '' });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Feedback" />
            <div className="p-4">
                <Dialog open={open} onOpenChange={setOpen}>
                    <div className="flex justify-end">
                        <DialogTrigger asChild>
                            <Button variant="outline" size="lg">
                                Post a Feedback
                            </Button>
                        </DialogTrigger>
                    </div>

                    <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                            <DialogTitle>Post feedback</DialogTitle>
                            <DialogDescription>
                                Share your feedback. Click Post when you're
                                done.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        required
                                    />
                                    {errors.title && (
                                        <div className="text-red-500">
                                            {errors.title}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="message">Feedback</Label>
                                    <Input
                                        id="message"
                                        name="message"
                                        value={data.feedback}
                                        onChange={(e) =>
                                            setData('feedback', e.target.value)
                                        }
                                        required
                                    />
                                    {errors.feedback && (
                                        <div className="text-red-500">
                                            {errors.feedback}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <DialogFooter className="m-3">
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Feedback'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
                {flash.success && (
                    <Alert variant="default" className="m-4">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}
                <div className="m-5 p-5">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Feedback</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {feedbacks.map((feedback: any) => (
                                <TableRow key={feedback.id}>
                                    <TableCell className="font-medium">
                                        {feedback.title}
                                    </TableCell>
                                    <TableCell>{feedback.feedback}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-8"
                                                >
                                                    <MoreHorizontalIcon />
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem variant="destructive">
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
