# TodoListo!


Todolisto is test a project.
It has a 3-Tiers architecture composed of frontend, backend and database

The frontend it's developed with React.js, and the backend is in Python with FASTAPI Framework, The database is mongo.

The choice of using mongodb it's determinated from the nature of data to save. A text with few field.

# Requirements 

- [docker](https://www.docker.com/)
- [docker compose](https://docs.docker.com/compose/)

# How to start locally

1. clone repository 
    `git clone git@github.com:dpiada/todolisto.git`

2. change project directory 
    `cd todolisto`

3. run docker compose 
    `docker compose up`

4. if the 3 services starts correctly got to
    frontend - `localhost:3000`
    backend - `localhost:8080/docs`
    database - use own client mongo to view database

# Backend

The backend it's developed in python and I used FastApi framework, this because is lightweight and fast to use.

The backend has followinf scaffold:

`root`:
- Dockerfile
- requerements
- `models` -> folder that contains object model for validation
- `provider` -> folder used for save file for communicate with external service like db... maybe thise name is a little confusiong
- `routes` -> folder with routes
- main -> start point 

# Frontend

Frontend is in javascript with react framework
I used bootstrp-react for style and for component

# Deployment

In a cloud contenxt I'd use something like this

![infra](./files/digram.jpg)

**The frontend** 
- is deployed on aws s3 distribuited from a cdn, this allow us to keep bucket private.

**The backend**
- use an ecr to upload and store images
- Ecs to deploy container and get image from ecr
- Application loadbalancer to expose API
- Nat Gateway to reach external Services

**Database**
- document DB managed because support mongodb

**Possible Integration**
- it can be use cognito userpool and link to ALB to support a kind of authentication

**Links**

- [3-tier architecture](https://docs.aws.amazon.com/whitepapers/latest/serverless-multi-tier-architectures-api-gateway-lambda/three-tier-architecture-overview.html)
- [ECR - ECS - ELB](https://docs.aws.amazon.com/codepipeline/latest/userguide/tutorials-ecs-ecr-codedeploy.html)
- [FE on s3](https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/deploy-a-react-based-single-page-application-to-amazon-s3-and-cloudfront.html)
- [ Gitlab to ECR](https://forum.gitlab.com/t/ci-cd-docker-image-to-aws/77386)



# Useful links

- [quote generator](https://dummyjson.com/)
- [mongo](https://www.mongodb.com/resources/languages/python)
- [mongo-fastapi](https://www.mongodb.com/developer/languages/python/python-quickstart-fastapi/)
- [pydantic](https://docs.pydantic.dev/latest/)