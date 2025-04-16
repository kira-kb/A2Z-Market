import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

interface CarouselCardProps {
  data: {
    id: string;
    name: string;
    description: string;
    image: string;
  };
}

export default function CarouselCard({
  data,
  ...props
}: React.ComponentProps<typeof Card> & CarouselCardProps) {
  // const data = [
  //   {
  //     id: 1,
  //     title: "Noteworthy technology acquisitions 2021",
  //     description:
  //       "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  //     imgSrc: img,
  //   },
  //   {
  //     id: 2,
  //     title: "Top 10 AI breakthroughs of 2022",
  //     description:
  //       "These AI advancements are expected to revolutionize various industries and change the way we interact with technology.",
  //     imgSrc: img,
  //   },
  // ];

  // console.log(data);

  return (
    <div className="relative min-w-[240px] p-4" {...props}>
      {/* Card component */}
      <Card
        {...props}
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <Image
          src={`/api/telegram-file?fileId=${data.image}`}
          alt={data.name}
          width={400}
          height={400}
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        />

        <CardContent className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.name.length > 33 ? data.name.slice(0, 30) + "..." : data.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {data.description.length > 83
              ? data.description.slice(0, 80) + "..."
              : data.description}
          </p>
          <Link
            href={`/shop/${data.id}`}
            className="max-w-40 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <ChevronRight className="ml-2" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
