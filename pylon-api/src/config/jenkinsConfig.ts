import { registerAs } from "@nestjs/config";

export default registerAs('jenkins', () => ({
    auth: {
        username: process.env.JENKINS_USER,
        password: process.env.JENKINS_TOKEN
    }    
}))