"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  kfid: z.string().min(1, "KFID is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface RegistrationScreenProps {
  onContinue: (name: string, email: string, kfid: string) => void;
}

export function RegistrationScreen({
  onContinue,
}: Readonly<RegistrationScreenProps>) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      kfid: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    onContinue(values.name.trim(), values.email.trim(), values.kfid.trim());
  };

  return (
    <Card className="w-full max-w-lg border-border bg-card/90 shadow-sm animate-screen-fade">
      <CardHeader className="space-y-3 text-center">
        <CardTitle className="font-bebas text-4xl tracking-widest sm:text-5xl">
          Maze Challenge
        </CardTitle>
        <CardDescription className="font-marker text-sm tracking-widest">
          Register to begin the KIIT Fest maze challenge.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      className="h-11 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      className="h-11 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kfid"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    KFID
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your KIIT Fest ID"
                      className="h-11 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-2 h-11 w-full font-semibold tracking-wide"
              disabled={form.formState.isSubmitting}
            >
              Start Challenge
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
