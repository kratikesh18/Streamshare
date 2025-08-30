"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/lib/axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  platform: string;
  plan: string;
  totalSlots: number | string;
  pricePerSlot: number | string;
  description: string;
  groupRules: string; // newline-separated
  featuresIncluded: string; // newline-separated
};

export default function CreateMembershipPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      platform: "spotify",
      plan: "Basic",
      totalSlots: 2,
      pricePerSlot: 50,
      description:
        "Share your Spotify Premium Family plan with the community. Billing is handled monthly. No password changes or profile name edits.",
      groupRules: [
        "No password or email changes",
        "Use your assigned profile only",
        "Do not remove other profiles",
        "Payment due before renewal date",
        "Max 1 active device per member at a time",
      ].join("\n"),
      featuresIncluded: [
        "Ad-free music",
        "High-quality streaming",
        "Offline downloads",
        "Family plan support (up to 6 profiles)",
      ].join("\n"),
    },
  });

  const toLines = (s: string) =>
    s
      .split(/\r?\n/)
      .map((v) => v.trim())
      .filter(Boolean);

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        platform: values.platform,
        plan: values.plan,
        totalSlots: Number(values.totalSlots),
        pricePerSlot: Number(values.pricePerSlot),
        description: values.description.trim(),
        groupRules: toLines(values.groupRules),
        featuresIncluded: toLines(values.featuresIncluded),
      };

      const response = await axiosInstance.post("api/membership", payload);
      console.log("Membership created:", response.data);
      //use sonner
      toast.success("Membership created!");
      router.push(`/mymemberships`);
    } catch (error) {
      console.error(error);
      // toast.error("Failed to create membership");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 md:px-12 lg:px-32">
      <div className="w-full max-w-7xl py-10">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-[#a560fa] tracking-tight">
            Create Membership
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-[#18181b] border-[#232323] shadow-xl">
              <CardHeader>
                <CardTitle className="text-[#ededed]">
                  Membership Details
                </CardTitle>
                <CardDescription className="text-[#a3a3a3]">
                  Share your OTT platform subscription with others
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="platform"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Platform</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select platform" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="netflix">Netflix</SelectItem>
                                <SelectItem value="disney">Disney+</SelectItem>
                                <SelectItem value="hbo">HBO Max</SelectItem>
                                <SelectItem value="amazon">
                                  Amazon Prime
                                </SelectItem>
                                <SelectItem value="hulu">Hulu</SelectItem>
                                <SelectItem value="apple">Apple TV+</SelectItem>
                                <SelectItem value="spotify">Spotify</SelectItem>
                                <SelectItem value="youtube">
                                  YouTube Premium
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="plan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Plan</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Premium, Family, etc."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="totalSlots"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Slots</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={2}
                                max={10}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Maximum number of people who can join (including
                              you)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="pricePerSlot"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price per Slot (₹/month)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="1.00"
                                min={1}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              How much each member will pay monthly
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your membership offering..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide details about your membership, payment
                            schedule, etc.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="groupRules"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Group Rules</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter each rule on a new line..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              List any rules for members (one per line)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="featuresIncluded"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Features Included</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter each feature on a new line..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              List the features of this plan (one per line)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#a560fa] hover:bg-[#7e25eb] text-white font-semibold px-6 py-2 rounded-lg transition"
                      >
                        {isSubmitting ? "Creating..." : "Create Membership"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-[#18181b] border-[#232323] shadow-xl">
              <CardHeader>
                <CardTitle className="text-[#ededed]">Guidelines</CardTitle>
                <CardDescription className="text-[#a3a3a3]">
                  Tips for creating a successful membership
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-1 text-[#a560fa]">
                    Be Clear About Expectations
                  </h4>
                  <p className="text-sm text-[#a3a3a3]">
                    Clearly state payment schedules, rules, and what happens if
                    someone leaves.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-[#a560fa]">
                    Set a Fair Price
                  </h4>
                  <p className="text-sm text-[#a3a3a3]">
                    The total from all slots should cover your subscription cost
                    plus a small fee for your management.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-[#a560fa]">
                    Describe the Plan Accurately
                  </h4>
                  <p className="text-sm text-[#a3a3a3]">
                    Include details like video quality, number of simultaneous
                    streams, and any limitations.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-[#a560fa]">
                    Be Responsive
                  </h4>
                  <p className="text-sm text-[#a3a3a3]">
                    Respond promptly to inquiries and keep your group members
                    updated.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
