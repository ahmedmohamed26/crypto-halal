"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  emailRequired: string;
};

export default function Login() {
  const t = useTranslations("Login");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <section className="bg-[#F1F7FD]">
      <form onSubmit={handleSubmit(onSubmit)} className="container  py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <label
              htmlFor="UserEmail"
              className="block text-xs font-medium text-gray-700"
            >
              Email
            </label>

            <input
              type="email"
              id="UserEmail"
              placeholder="john@rhcp.com"
              className="w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black border indent-2.5 !outline-none"
              {...register("email")}
              defaultValue=""
            />

            <input type="submit" />
          </div>

          <div className="text-center">
            <h2 className="text-primary lg:text-[50px] md:text-[35px] sm:text-[20px] font-semibold mb-4">
              {t("title")}
            </h2>
            <div className="grid grid-cols-2 items-center">
              <div className="flex flex-col items-center">
                <Link href="/">
                  <img
                    src="assets/play-store.svg"
                    alt="play store"
                    width={150}
                    height={150}
                    className="mb-8"
                  />
                </Link>

                <Link href="/">
                  <img
                    src="assets/ios-store.svg"
                    alt="ios store"
                    width={150}
                    height={150}
                  />
                </Link>
              </div>
              <img
                src="assets/iPhone.svg"
                alt="store"
                width={250}
                height={250}
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
