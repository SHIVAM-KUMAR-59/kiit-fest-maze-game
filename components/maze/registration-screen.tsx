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
  kfid: z.string().min(1, "KFID is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface RegistrationScreenProps {
  onContinue: (kfid: string) => Promise<void>;
  error?: string;
  loading?: boolean;
}

export function RegistrationScreen({
  onContinue,
  error,
  loading,
}: Readonly<RegistrationScreenProps>) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kfid: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    await onContinue(values.kfid.trim());
  };

  return (
    <Card className="w-full max-w-lg border-none bg-background animate-screen-fade">
      <CardHeader className="space-y-3 text-center">
        <CardTitle className="font-bebas text-4xl tracking-widest sm:text-5xl">
          Maze Run
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
              disabled={form.formState.isSubmitting || loading}
            >
              {form.formState.isSubmitting || loading ?
                "Registering..."
              : "Start Challenge"}
            </Button>

            {error && (
              <p className="mt-2 text-center text-sm text-destructive">
                {error}
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
