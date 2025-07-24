"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, MessageCircle } from "lucide-react"
import { ApplicationReviewModal } from "./application-review-modal"

// Mock data for jobs created by the user
const myJobs = [
	{
		id: "1",
		title: "Frontend React Developer",
		status: "active",
		applicationsCount: 5,
		createdAt: "2025-07-23T10:30:00Z",
		applications: [
			{
				id: "1",
				applicantName: "Juan Pérez",
				message: "I have 3 years of experience with React and TypeScript. I've worked on several similar projects...",
				expectedSalary: "$1000",
				availability: "Immediate",
				portfolio: "https://github.com/juanperez",
				appliedAt: "2025-07-23T11:00:00Z",
				status: "pending",
			},
			{
				id: "2",
				applicantName: "Ana García",
				message: "I'm a frontend developer with experience in React, Next.js and Tailwind CSS...",
				expectedSalary: "$900",
				availability: "In 1 week",
				portfolio: "https://anagarcia.dev",
				appliedAt: "2025-07-23T12:30:00Z",
				status: "pending",
			},
		],
	},
]

// Mock data for user's applications
const myApplications = [
	{
		id: "1",
		jobTitle: "UX/UI Designer for Mobile App",
		company: "Carlos Ruiz",
		status: "pending",
		appliedAt: "2025-07-23T09:00:00Z",
		message: "My experience in mobile app design...",
	},
	{
		id: "2",
		jobTitle: "Content Writer for Tech Blog",
		company: "Ana Martínez",
		status: "accepted",
		appliedAt: "2025-07-22T16:00:00Z",
		message: "I have experience writing about technology...",
	},
]

export function PetitionsMain() {
	const [selectedJob, setSelectedJob] = useState<(typeof myJobs)[0] | null>(null)
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

	const handleReviewApplications = (job: (typeof myJobs)[0]) => {
		setSelectedJob(job)
		setIsReviewModalOpen(true)
	}

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "active":
				return <Badge className="bg-green-600">Active</Badge>
			case "pending":
				return <Badge variant="secondary">Pending</Badge>
			case "accepted":
				return <Badge className="bg-green-600">Accepted</Badge>
			case "rejected":
				return <Badge variant="destructive">Rejected</Badge>
			default:
				return <Badge variant="outline">{status}</Badge>
		}
	}

	return (
		<div className="w-full mx-auto">
			<div className="border-b border-border p-4">
				<h2 className="text-xl font-bold">My Jobs</h2>
				<p className="text-muted-foreground">Manage your requests and applications</p>
			</div>

			<Tabs defaultValue="posted" className="w-full">
				<TabsList className="grid min-w-xl  grid-cols-2 m-4  mx-auto">
					<TabsTrigger value="posted">Posted Jobs</TabsTrigger>
					<TabsTrigger value="applied">My Applications</TabsTrigger>
				</TabsList>

				<TabsContent value="posted" className="p-4 space-y-4">
					{myJobs.map((job) => (
						<Card key={job.id}>
							<CardHeader>
								<div className="flex justify-between items-start">
									<div>
										<CardTitle className="text-lg">{job.title}</CardTitle>
										<p className="text-sm text-muted-foreground">
											Posted on {new Date(job.createdAt).toLocaleDateString("en-US")}
										</p>
									</div>
									{getStatusBadge(job.status)}
								</div>
							</CardHeader>
							<CardContent>
								<div className="flex justify-between items-center">
									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										<span className="flex items-center gap-1">
											<Eye className="h-4 w-4" />
											{job.applicationsCount} applications
										</span>
									</div>
									<Button onClick={() => handleReviewApplications(job)} className="bg-primary hover:bg-primary/80 cursor-pointer">
										Review Applications
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</TabsContent>

				<TabsContent value="applied" className="p-4 space-y-4">
					{myApplications.map((application) => (
						<Card key={application.id}>
							<CardHeader>
								<div className="flex justify-between items-start">
									<div>
										<CardTitle className="text-lg">{application.jobTitle}</CardTitle>
										<p className="text-sm text-muted-foreground">Company: {application.company}</p>
										<p className="text-sm text-muted-foreground">
											Applied on {new Date(application.appliedAt).toLocaleDateString("en-US")}
										</p>
									</div>
									{getStatusBadge(application.status)}
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground mb-3">{application.message.substring(0, 100)}...</p>
								<div className="flex gap-2">
									<Button variant="outline" size="sm">
										<MessageCircle className="h-4 w-4 mr-2" />
										View Details
									</Button>
									{application.status === "pending" && (
										<Button variant="outline" size="sm">
											Edit Application
										</Button>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</TabsContent>
			</Tabs>

			{selectedJob && (
				<ApplicationReviewModal open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen} job={selectedJob} />
			)}
		</div>
	)
}
