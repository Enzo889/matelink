import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function JobsAside() {
  const jobs = [
    {
      company: "Google",
      position: "Frontend Developer",
      location: "Mountain View, CA",
      salary: "$120,000 - $150,000",
      posted: "Posted 1 day ago",
      type: "Full-time",
      image: "/google.jpg",
    },
    {
      company: "Amazon",
      position: "Backend Engineer",
      location: "Seattle, WA",
      salary: "$110,000 - $140,000",
      posted: "Posted 3 days ago",
      type: "Full-time",
      image: "/amazon.jpg",
    },
    {
      company: "Mercado Libre",
      position: "DevOps Specialist",
      location: "Buenos Aires, Argentina",
      salary: "$60,000 - $80,000",
      posted: "Posted 5 days ago",
      type: "Full-time",
      image: "/mercadolibre.jpg",
    },
  ];

  return (
    <div className="flex flex-col items-start text-start text-pretty gap-4 p-6 bg-background border rounded-lg">
      <p className="font-semibold text-2xl">Job offers for you</p>
      {jobs.map((job, idx) => (
        <Link
          key={idx}
          href="/jobs"
          className="hover:bg-foreground/5 transition-colors p-2 rounded-md w-full flex items-center gap-4"
          title={`View job offer at ${job.company}`}
          aria-label={`View job offer at ${job.company}`}
          role="link"
        >
          <Image alt={job.company} src={job.image} width={70} height={100} />
          <div>
            <p className="text-sm">
              {job.position} at {job.company}
            </p>
            <p className="text-xs text-foreground/50">
              Location: {job.location}
            </p>
            <p className="text-xs text-foreground/50">Salary: {job.salary}</p>
            <p className="text-xs text-foreground/50">{job.posted}</p>
            <p className="text-xs text-foreground/50">{job.type}</p>
          </div>
        </Link>
      ))}
      <Button asChild variant="link" className="p-0">
        <Link href="/jobs" className="text-xs ">
          View all job offers
        </Link>
      </Button>
    </div>
  );
}

export default JobsAside;
