# Cloud Native CI/CD Pipeline

Welcome to the Cloud Native CI/CD Pipeline project! This repository contains the implementation of a CI/CD pipeline using various cloud-native tools and technologies.

## Project Description

This project demonstrates the creation of a robust CI/CD pipeline leveraging Docker, Google Kubernetes Engine (GKE), REST APIs, Google Cloud Platform (GCP), and Terraform. The main goal is to automate the deployment and management of microservices, ensuring efficient inter-service communication and scalable, repeatable infrastructure deployment.

## Features

- **Containerization with Docker**: Containerized two microservices to ensure consistency across different environments.
- **Deployment on GKE**: Deployed the containerized microservices on Google Kubernetes Engine (GKE), ensuring efficient inter-service communication via REST APIs.
- **CI/CD Pipeline**: Built a robust CI/CD pipeline using GCP tools:
  - **Cloud Source Repository**: Used for version control.
  - **Artifact Registry**: Managed Docker images.
- **Infrastructure as Code (IaC)**: Automated the creation and management of Kubernetes clusters using Terraform, enabling scalable and repeatable infrastructure deployment.

## Technologies Used

- **Docker**: For containerizing the microservices.
- **Google Kubernetes Engine (GKE)**: For deploying and managing the microservices.
- **REST APIs**: For inter-service communication.
- **Google Cloud Platform (GCP)**: For various cloud services.
  - **Cloud Source Repository**: Version control system.
  - **Artifact Registry**: Docker image management.
- **Terraform**: For automating the deployment and management of the Kubernetes clusters.

## Architecture

The architecture of this project involves the following components:

1. **Microservices**: Two microservices containerized using Docker.
2. **Google Kubernetes Engine (GKE)**: Microservices are deployed on GKE.
3. **CI/CD Pipeline**:
   - **Cloud Source Repository**: Hosts the source code.
   - **Artifact Registry**: Stores Docker images.
   - **Cloud Build**: Triggers the build and deployment process.
4. **Terraform**: Manages the infrastructure, including the creation and scaling of Kubernetes clusters.

## Setup and Deployment

Follow these steps to set up and deploy the project:

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/Dharmil4602/cloud-native-CI-CD.git
    cd cloud-native-CI-CD
    ```

2. **Build Docker Images**:
    ```sh
    docker build -t <your-docker-image-name> ./container-1
    docker build -t <your-docker-image-name> ./container-2
    ```

3. **Push Docker Images to Artifact Registry**:
    ```sh
    docker tag <your-docker-image-name> <artifact-registry-repo>/<your-docker-image-name>
    docker push <artifact-registry-repo>/<your-docker-image-name>
    ```

4. **Deploy with Terraform**:
    - Initialize Terraform:
      ```sh
      terraform init
      ```
    - Apply Terraform configuration:
      ```sh
      terraform apply
      ```

5. **Trigger the CI/CD Pipeline**:
    - Set up Cloud Build triggers in GCP to automate the build and deployment process whenever changes are pushed to the Cloud Source Repository.

## Usage

Once the setup and deployment are complete, you can interact with the microservices through their exposed REST APIs. Detailed API documentation can be found in the `api-docs` directory.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the project's coding standards and include appropriate tests.

---
