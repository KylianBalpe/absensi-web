"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { AddFishFormSchema } from "@/lib/form/fish-form";
import { ChevronLeftIcon } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { uploadImage } from "@/lib/action/authentication";
import { addFish } from "@/lib/action/fish";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoadingSVG } from "@/components/iconSVG";

const AddFishForm = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const [fishFoods, setFishFoods] = React.useState<string[]>([]);
  const [fishTags, setFishTags] = React.useState<string[]>([]);
  const [fishCompatibilities, setFishCompatibilities] = React.useState<
    string[]
  >([]);
  const [fishImages, setFishImages] = React.useState<string[]>([]);
  const [fishInfoSrc, setFishInfoSrc] = React.useState<string[]>([]);
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof AddFishFormSchema>>({
    resolver: zodResolver(AddFishFormSchema),
    defaultValues: {
      name: "",
      latin_name: "",
      ideal_temperature: "",
      ideal_ph: "",
      description: "",
      treatment: "",
      general_problem: "",
      history: "",
      foods: [],
      tags: [],
      compatibility: [],
      images: [],
      info_src: [],
      tipe: "ikan",
    },
  });

  const fileRefs = form.register("images");

  async function onSubmit(values: z.infer<typeof AddFishFormSchema>) {
    setIsSubmit(true);

    if (values.images.length === 0) {
      toast.error("Error", {
        description: (
          <p className="text-sm text-red-600">
            Please upload at least one image
          </p>
        ),
        duration: 2000,
      });
      setIsSubmit(false);
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < values.images.length; i++) {
      formData.append("images", values.images[i]);
    }

    formData.append("tipe", values.tipe);

    try {
      if (status === "authenticated" && session) {
        toast("Uploading...", {
          icon: <LoadingSVG />,
          duration: Infinity,
          id: "upload-toast",
        });
        const image = await uploadImage(formData, session.user.accessToken);

        if (image.code !== 200) {
          toast.dismiss("upload-toast");
          toast.error("Error", {
            description: (
              <p className="text-sm text-red-600">{image.message}</p>
            ),
            duration: 2000,
          });
          setIsSubmit(false);
          return;
        }

        if (image.code === 200) {
          toast.dismiss("upload-toast");
          toast.success("Success", {
            description: (
              <p className="text-sm text-green-700"> {image.message}</p>
            ),
            duration: 2000,
          });
        }

        toast("Submit data...", {
          icon: <LoadingSVG />,
          duration: Infinity,
          id: "submit-toast",
        });

        const fish = await addFish(
          {
            name: values.name,
            latin_name: values.latin_name,
            ideal_temperature: values.ideal_temperature,
            ideal_ph: values.ideal_ph,
            description: values.description,
            treatment: values.treatment,
            general_problem: values.general_problem,
            history: values.history,
            foods: values.foods,
            tags: values.tags,
            compatibility: values.compatibility,
            images_url: image.data,
            info_src: values.info_src,
            tipe: values.tipe,
          },
          session.user.accessToken,
        );

        if (fish.code !== 200) {
          toast.dismiss("submit-toast");
          toast.error("Error", {
            description: <p className="text-sm text-red-600">{fish.message}</p>,
            duration: 2000,
          });
          setIsSubmit(false);
          return;
        }

        toast.dismiss("submit-toast");
        toast.success("Success", {
          description: <p className="text-sm text-green-700">{fish.message}</p>,
          duration: 2000,
        });

        router.push("/dashboard/fish");

        form.reset();
        setFishFoods([]);
        setFishTags([]);
        setFishCompatibilities([]);
        setFishImages([]);
        setFishInfoSrc([]);
        setIsSubmit(false);
        return;
      }
    } catch (error) {
      console.error("An error occurred", error);
      setIsSubmit(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <main className="grid flex-1 items-start gap-6 sm:py-0">
          <div className="flex flex-wrap items-center gap-6">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href="/dashboard/fish">
                <ChevronLeftIcon className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Add New Fish Data
            </h1>
            <div className="flex items-center gap-2 md:ml-auto">
              <Button size="sm" type="submit" disabled={isSubmit}>
                Save Changes
              </Button>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Fish Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="name">Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Name"
                                  id="name"
                                  disabled={isSubmit}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="latin_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="latin_name">
                                Latin Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Latin Name"
                                  id="latin_name"
                                  disabled={isSubmit}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="ideal_temperature"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="ideal_temperature">
                                Ideal Temperature
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Ideal Temperature"
                                  id="ideal_temperature"
                                  disabled={isSubmit}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="ideal_ph"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="ideal_ph">Ideal pH</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Ideal pH"
                                  id="ideal_ph"
                                  disabled={isSubmit}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Fish Description"
                                rows={10}
                                id="description"
                                disabled={isSubmit}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Treatment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="treatment"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Fish Treatment"
                                rows={10}
                                id="treatment"
                                disabled={isSubmit}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>General Problem</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="general_problem"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="General Problem"
                                rows={10}
                                id="general_problem"
                                disabled={isSubmit}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="history"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Fish History"
                                rows={10}
                                id="history"
                                disabled={isSubmit}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Foods</CardTitle>
                  <CardDescription>
                    Press &quot;enter&quot; or &quot;,&quot; (comma) to separate
                    between item(s)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="foods"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <MultipleInput
                            placeholder="Fish Foods"
                            id="foods"
                            {...field}
                            disabled={isSubmit}
                            value={fishFoods}
                            onChange={(value) => {
                              setFishFoods(value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          *If item are same will be ignored
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                  <CardDescription>
                    Press &quot;enter&quot; or &quot;,&quot; (comma) to separate
                    between item(s)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <MultipleInput
                            placeholder="Tags"
                            id="tags"
                            disabled={isSubmit}
                            {...field}
                            value={fishTags}
                            onChange={(value) => {
                              setFishTags(value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          *If item are same will be ignored
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Compatibility</CardTitle>
                  <CardDescription>
                    Press &quot;enter&quot; or &quot;,&quot; (comma) to separate
                    between item(s)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="compatibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <MultipleInput
                            placeholder="Compatibility"
                            id="compatibility"
                            disabled={isSubmit}
                            {...field}
                            value={fishCompatibilities}
                            onChange={(value) => {
                              setFishCompatibilities(value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Images</CardTitle>
                  <CardDescription>
                    Select one or more images, with a maximum size of 5 MB per
                    image.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <MultipleImageInput
                            id="images"
                            disabled={isSubmit}
                            {...fileRefs}
                            value={fishImages}
                            onChange={(value) => {
                              const event = {
                                target: {
                                  value: value,
                                  type: "file",
                                },
                              };

                              setFishImages(value);
                              fileRefs.onChange(event);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Image format must be: JPG, PNG, or JPEG
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Information Source</CardTitle>
                  <CardDescription>
                    Press &quot;enter&quot; or &quot;,&quot; (comma) to separate
                    between item(s)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="info_src"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <MultipleInput
                            placeholder="Information Source"
                            id="info_src"
                            disabled={isSubmit}
                            {...field}
                            value={fishInfoSrc}
                            onChange={(value) => {
                              setFishInfoSrc(value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          *If item are same will be ignored
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <FormField
                control={form.control}
                name="tipe"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input id="tipe" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </main>
      </form>
    </Form>
  );
};

export default AddFishForm;
