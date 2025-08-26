"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";

import { InputWithLabel } from "../ui/InputWithLabel";
import Star_Border from "../ui/Star_Border";
import { useAuth } from "../../context/Auth_Context";

const LoginForm = () => {
  const t = useTranslations("Login");
  const { register, handleSubmit, formState, setError, watch } = useForm();
  const router = useRouter();
  const pathname = usePathname();
  const { login } = useAuth();

  const locale = pathname.split("/")[1];

  const onSubmit = async (data: Record<string, string>) => {
    try {
      await login(data.email, data.password);
      router.push(`/${locale}/dashboard`);
    } catch (err) {
      console.error(JSON.stringify(err));
      if ((err as Response).status === 401) {
        setError("root", {
          type: "400",
          message: t("login-failed"),
        });
      } else {
        setError("root", {
          type: "500",
          message: t("server-error"),
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Image 
        src="/assets/images/logo.png" 
        alt="logo" 
        width={200}
        height={80}
        className="w-full max-w-[200px]" 
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full max-w-sm mt-10"
      >
        <InputWithLabel
          variant="large"
          id="email"
          {...register("email", { required: true })}
          label={t("email-field")}
        />

        <div>
          <InputWithLabel
            variant="large"
            type="password"
            id="password"
            {...register("password", { required: true })}
            label={t("password-field")}
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-2 text-red-500 text-xs/4 min-h-4">
            {formState.errors.root?.message}
          </div>
          <Star_Border
            as="button"
            type="submit"
            disabled={!formState.isValid || formState.isSubmitting}
            color="cyan"
            speed="4s"
            thickness={3}
            className="w-full"
          >
            {t("login-btn")}
          </Star_Border>
        </div>

        <p className="text-sm/5 text-center text-white">
          {t("login-no-account")}{" "}
          <Link
            href="/login?panel=register"
            className="font-bold hover:underline decoration-2 text-white"
          >
            {t("login-cta")}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
