"use client";

import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SettingsSchema} from "@/schemas";
import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useTransition, useState} from "react";
import {settings} from "@/actions/settings";
import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import {useCurrentUser} from "@/hooks/use-current-user";
import {FormSuccess} from "@/components/form-success";
import {FormError} from "@/components/form-error";
import {UserRole} from "@prisma/client";
import {Switch} from "@/components/ui/switch";

const SettingsPage = () => {
    const user = useCurrentUser();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const {update} = useSession();
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            newPassword: undefined,
            password: undefined,
            name: user?.name || undefined,
            email: user?.email || undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
        }
    });


    const onSubmit = (values:z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values)
                .then((data) => {
                if (data.error){
                    setError(data.error)
                }

                if (data.success){
                    update();
                    setSuccess(data.success)
                }
            })
                .catch(() => setError("Algo salio mal :("))
        });
    }

    return (
        <Card className="w-[600px] overflow-auto">
            <CardHeader>
                <p className="text-1xl font-semibold text-center">
                    ⚙️ Configuración
                </p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                  <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                      <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Nombre:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Nuevo Nombre"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                          />
                          {user?.isOAuth === false && (
                              <>
                                  <FormField
                                      control={form.control}
                                      name="email"
                                      render={({field}) => (
                                          <FormItem>
                                              <FormLabel>
                                                  Email:
                                              </FormLabel>
                                              <FormControl>
                                                  <Input
                                                      {...field}
                                                      placeholder="alguien@example.com"
                                                      type="email"
                                                      disabled={isPending}
                                                  />
                                              </FormControl>
                                              <FormMessage />
                                          </FormItem>
                                      )}
                                  />
                                  <FormField
                                      control={form.control}
                                      name="password"
                                      render={({field}) => (
                                          <FormItem>
                                              <FormLabel>
                                                  Password:
                                              </FormLabel>
                                              <FormControl>
                                                  <Input
                                                      {...field}
                                                      placeholder="********"
                                                        type="password"
                                                      disabled={isPending}
                                                  />
                                              </FormControl>
                                              <FormMessage />
                                          </FormItem>
                                      )}
                                  />
                                  <FormField
                                      control={form.control}
                                      name="newPassword"
                                      render={({field}) => (
                                          <FormItem>
                                              <FormLabel>
                                                  Nueva Contraseña:
                                              </FormLabel>
                                              <FormControl>
                                                  <Input
                                                      {...field}
                                                      placeholder="Escriba una clave nueva"
                                                      type="password"
                                                      disabled={isPending}
                                                  />
                                              </FormControl>
                                              <FormMessage />
                                          </FormItem>
                                      )}
                                  />
                              </>
                          )}
                          <FormField
                              control={form.control}
                              name="role"
                              render={({field}) => (
                                  <FormItem>
                                     <FormLabel>
                                            Rol:
                                     </FormLabel>
                                      <Select
                                        disabled={isPending}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                          <FormControl>
                                              <SelectTrigger>
                                                  <SelectValue placeholder=" Seleccione un rol" />
                                              </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                              <SelectItem value={UserRole.ADMIN}>
                                                  Administrador
                                              </SelectItem>
                                              <SelectItem value={UserRole.USER}>
                                                  Usuario
                                              </SelectItem>
                                            </SelectContent>
                                      </Select>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                          {user?.isOAuth === false && (
                              <FormField
                                  control={form.control}
                                  name="isTwoFactorEnabled"
                                  render={({field}) => (
                                      <FormItem className="flex flex-row items center
                                        justify-between rounded-lg border p-3 shadow-sm
                                      ">
                                          <div className="space-y-0.5">
                                              <FormLabel>Autenticación en dos pasos:</FormLabel>
                                              <FormDescription>
                                                  Protege tu cuenta con una capa adicional de seguridad
                                              </FormDescription>
                                          </div>
                                          <FormControl>
                                              <Switch
                                                  className="bg-blue-500"
                                                  disabled={isPending}
                                                  checked={field.value}
                                                  onChange={field.onChange}
                                                />
                                          </FormControl>
                                      </FormItem>
                                  )}
                              />
                            )}
                      </div>
                      <FormError message={error} />
                        <FormSuccess message={success} />
                      <Button
                        disabled={isPending}
                        type="submit"
                      >
                          Guardar
                      </Button>
                  </form>
              </Form>
            </CardContent>
        </Card>
    );
}

export default SettingsPage;