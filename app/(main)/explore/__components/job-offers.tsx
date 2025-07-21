"use client";

import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Building,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function JobOffers() {
  const jobOffers = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote",
      type: "Full-time",
      salary: "$80K - $120K",
      posted: "2 hours ago",
      applicants: 23,
      skills: ["React", "TypeScript", "Next.js"],
      urgent: true,
      logo: "https://randomuser.me/api/portraits/lego/1.jpg",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "StartupXYZ",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$100K - $140K",
      posted: "4 hours ago",
      applicants: 45,
      skills: ["Product Strategy", "Analytics", "Leadership"],
      urgent: false,
      logo: "https://randomuser.me/api/portraits/lego/2.jpg",
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Design Studio",
      location: "New York, NY",
      type: "Contract",
      salary: "$60 - $80/hr",
      posted: "6 hours ago",
      applicants: 12,
      skills: ["Figma", "Prototyping", "User Research"],
      urgent: false,
      logo: "https://randomuser.me/api/portraits/lego/3.jpg",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      location: "Remote",
      type: "Full-time",
      salary: "$90K - $130K",
      posted: "8 hours ago",
      applicants: 31,
      skills: ["AWS", "Docker", "Kubernetes"],
      urgent: true,
      logo: "https://randomuser.me/api/portraits/lego/4.jpg",
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "AI Innovations",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$95K - $135K",
      posted: "12 hours ago",
      applicants: 67,
      skills: ["Python", "Machine Learning", "SQL"],
      urgent: false,
      logo: "https://randomuser.me/api/portraits/lego/5.jpg",
    },
    {
      id: 6,
      title: "Mobile Developer",
      company: "AppMakers Ltd",
      location: "Remote",
      type: "Part-time",
      salary: "$50K - $70K",
      posted: "1 day ago",
      applicants: 19,
      skills: ["React Native", "iOS", "Android"],
      urgent: false,
      logo: "https://randomuser.me/api/portraits/lego/6.jpg",
    },
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      "Full-time":
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "Part-time":
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Contract:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Job Opportunities</h2>
        </div>
        <Button variant="outline" size="sm">
          View All Jobs
        </Button>
      </div>

      <div className="grid gap-4">
        {jobOffers.map((job) => (
          <Card
            key={job.id}
            className="hover:shadow-md transition-shadow cursor-pointer group"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Image
                    src={job.logo}
                    alt={job.company}
                    width={64}
                    height={64}
                    className="w-12 h-12 rounded-lg object-cover border"
                  />
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {job.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <Building className="w-4 h-4" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                  </div>
                </div>
                {job.urgent && (
                  <Badge variant="destructive" className="animate-pulse">
                    Urgent
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{job.posted}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{job.applicants} applicants</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={getTypeColor(job.type)}>
                  {job.type}
                </Badge>
                <div className="flex flex-wrap gap-1">
                  {job.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {job.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{job.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm" className="cursor-pointer">
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Job Stats */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">1,247</div>
              <div className="text-sm text-muted-foreground">Active Jobs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">89</div>
              <div className="text-sm text-muted-foreground">New Today</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">456</div>
              <div className="text-sm text-muted-foreground">Companies</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">$85K</div>
              <div className="text-sm text-muted-foreground">Avg. Salary</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default JobOffers;
