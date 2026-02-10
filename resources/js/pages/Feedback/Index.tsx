import { Head } from '@inertiajs/react';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Your Feedbacks',
        href: '/feedback',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Feedback" />
            <div className="p-4">
                <Dialog>
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

                        <form>
                            <div className="grid gap-4">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" name="title" />
                                </div>
                                <div>
                                    <Label htmlFor="message">Message</Label>
                                    <Input id="message" name="message" />
                                </div>
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Post</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
