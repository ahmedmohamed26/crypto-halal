"use client";
import axiosInstance from "@/app/_lib/axios";
import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";

export default function Services() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("services");
        setData(response.data.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <section className="services bg-gray">
      {data?.map((service, index) =>
        (index + 1) % 2 !== 0 ? (
          <div key={index} id={service?.id} className="pt-16">
            <h3 className="text-center mb-16 text-[34px] text=black font-medium">
              {service?.name}
            </h3>
            <div
              style={{
                background:
                  "linear-gradient(-90deg, rgba(0,69,119,1) 0%, rgba(0,128,221,1) 65%)",
              }}
              className="py-16"
            >
              <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                  <p className="text-white font-medium text-[24px]  order-2 md:order-1">
                    {DOMPurify.sanitize(service?.desc?.replace(/&nbsp;/g, " "), {
                      USE_PROFILES: { html: false },
                    })}
                  </p>
                  <div className="flex items-center lg:justify-end justify-center order-1 md:order-2  mb-8 md:mb-0">
                    <Image
                      width={300}
                      height={200}
                      priority={true}
                      src={service?.image}
                      alt={service?.name}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div key={index} id={service?.id} className="pt-16">
            <h3 className="text-center mb-16 text-[34px] text=black font-medium">
              {service?.name}
            </h3>
            <div className="bg-white py-16">
              <div className="container ">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                  <div className="flex items-center lg:justify-start justify-center  mb-8 md:mb-0">
                    <Image
                      width={300}
                      height={200}
                      priority={true}
                      src={service?.image}
                      alt={service?.name}
                    />
                  </div>
                  <p className="text-black font-medium text-[24px]">
                    {DOMPurify.sanitize(service?.desc?.replace(/&nbsp;/g, " "), {
                      USE_PROFILES: { html: false },
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
}
