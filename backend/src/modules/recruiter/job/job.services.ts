import prisma from "../../../lib/prisma.js";
import { ApiError } from "../../../utils/ApiError.js";

import { EmploymentType, JobStatus } from "../../../generated/prisma/client.js";
const creatingJob = async (
    userId: number,
    title: string,
    description: string,
    location: string,
    employmentType: string,
    salaryMin: number,
    salaryMax: number,
    requirements: string,
    responsibilities: string,
    deadline: string,
    status: string
) => {
    //get userId  and data from body 
    //find recruiterProfile by userId 
    //error 
    //find company by recruiterProfileId
    //error
    //create job with companyId :company.id
    // return created job

    const recruiterProfile = await prisma.recruiterProfile.findUnique({
        where: {
            userId
        }
    });
    if (!recruiterProfile) {
        throw new ApiError(400, "Proifle is not found")
    }

    const company = await prisma.company.findUnique({
        where: {
            recruiterProfileId: recruiterProfile.id
        }
    });
    if (!company) {
        throw new ApiError(400, "company is not found")
    }

    const Job = await prisma.job.create({
        data: {
            title,
            description,
            location,
            employmentType,
            salaryMin,
            salaryMax,
            requirements,
            responsibilities,
            deadline: deadline ? new Date(deadline) : null,
            status,

            company: {
                connect: {
                    id: company.id
                }
            }
        }
    });

    return Job;
}

const getjob = async (
    userId: number,
    jobId: number
) => {
    //get the userId 
    //find the recruiterProfileId
    //error
    //find the comapny 
    //error
    //check by if condition that it is the user authenticated to access this 
    //find the job and retrun

    const recruiterProfile = await prisma.recruiterProfile.findUnique({
        where: {
            userId
        }
    });
    if (!recruiterProfile) {
        throw new ApiError(400, "Proifle is not found")
    }

    const company = await prisma.company.findUnique({
        where: {
            recruiterProfileId: recruiterProfile.id
        }
    });
    if (!company) {
        throw new ApiError(400, "company is not found")
    }

    const job = await prisma.job.findUnique({
        where: {
            // companyId:company.id 
            id: jobId
        }
    });
    if (!job) {
        throw new ApiError(404, "job is not found")
    };

    return job;
}

const deleteJob = async (
    userId: number,
    jobId: number
) => {
    //get user id and job id and then 
    // find recruiter 
    // find comapany
    // check the user 
    // delet job

    const recruiterProfile = await prisma.recruiterProfile.findUnique({
        where: {
            userId
        }
    });
    if (!recruiterProfile) {
        throw new ApiError(400, "Proifle is not found")
    }

    const company = await prisma.company.findUnique({
        where: {
            recruiterProfileId: recruiterProfile.id
        }
    });
    if (!company) {
        throw new ApiError(400, "company is not found")
    }

    // if(company.recruiterProfileId !== recruiterProfile.id){
    //     throw new ApiError(400,"You are not allowed to delete the job");
    // }

    const job = await prisma.job.findUnique({
        where: {
            id: jobId
        }
    })
    if (!job) {
        throw new ApiError(404, "Job is not found");
    }


    if (job.companyId !== company.id) {
        throw new ApiError(403, "You are not allowed to delete this job");
    }

    const deletedJob = await prisma.job.delete({
        where: {
            id: jobId
        }
    });

    return deletedJob;
}

const updateJob = async (
    userId: number,
    jobId: number,
    updateData: {
        title?: string;
        description?: string;
        location?: string;
        employmentType?: EmploymentType;
        salaryMin?: number;
        salaryMax?: number;
        requirements?: string;
        responsibilities?: string;
        deadline?: string;
        status?: JobStatus;
    }
) => {

    const recruiterProfile = await prisma.recruiterProfile.findUnique({
        where: {
            userId
        }
    });

    if (!recruiterProfile) {
        throw new ApiError(404, "Profile is not found");
    }

    const company = await prisma.company.findUnique({
        where: {
            recruiterProfileId: recruiterProfile.id
        }
    });
    if (!company) {
        throw new ApiError(404, "Company is not found");
    }
    const job = await prisma.job.findUnique({
        where: {
            id: jobId
        }
    })

    if (!job) {
        throw new ApiError(404, "Job is not found");
    }

    if (job.companyId !== company.id) {
        throw new ApiError(403,"You are not allowed to update this job");
    }

    const data: {
        title?: string;
        description?: string;
        location?: string;
        employmentType?: EmploymentType;
        salaryMin?: number;
        salaryMax?: number;
        requirements?: string;
        responsibilities?: string;
        deadline?: string;
        status?: JobStatus;
    } = {};

    if (updateData.title !== undefined) {data.title = updateData.title}
    if (updateData.description !== undefined) {data.description = updateData.description}
    if (updateData.location !== undefined) {data.location = updateData.location}
    if (updateData.employmentType !== undefined) {data.employmentType = updateData.employmentType}
    if (updateData.salaryMin !== undefined) {data.salaryMin = updateData.salaryMin}
    if (updateData.salaryMax !== undefined) {data.salaryMax = updateData.salaryMax}
    if (updateData.requirements !== undefined) {data.requirements = updateData.requirements}
    if (updateData.responsibilities !== undefined) {data.responsibilities = updateData.responsibilities}
    if (updateData.deadline !== undefined) {data.deadline = updateData.deadline}
    if (updateData.status !== undefined) {data.status = updateData.status as JobStatus}


    const updatedJob = await prisma.job.update({
        where: {
            id: jobId
        },
        data:data
    })

    return updatedJob;
};

const updateJobStatus = async (
  userId: number,
  jobId: number,
  status: JobStatus
) => {


  const recruiterProfile = await prisma.recruiterProfile.findUnique({
    where: { userId }
  })

  if (!recruiterProfile) {
    throw new ApiError(404, "Recruiter profile is not found");
  }

  const company = await prisma.company.findUnique({
    where: {
      recruiterProfileId: recruiterProfile.id
    }
  })
  if (!company) {
    throw new ApiError(404, "Company is not found");
  }

  const job = await prisma.job.findUnique({
    where: {
      id: jobId
    }
  });

  if (!job) {
    throw new ApiError(404, "Job is not found");
  }

  if (job.companyId !== company.id) {
    throw new ApiError(403,"You are not allowed to update this job")
  }

  const updatedJob = await prisma.job.update({
    where: {
        id:jobId
    },
    data: {
      status
    }
  })

  return updatedJob;
};

export { creatingJob, getjob, deleteJob ,updateJob,updateJobStatus};