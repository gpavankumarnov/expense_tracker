FROM node:22.14.0-alpine AS builder

WORKDIR /app

# so .npmrc is not there as it is built using public deps so not used
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies 
RUN pnpm install 

# Copy rest of the app source code
COPY . .

# Build the React app 
RUN pnpm build 


# ----------------------------


# Stage 2: Serve with NGINX 
FROM nginx:stable-alpine 

# Copy custom nginx config 
# COPY scripts/nginx.conf /etc/nginx/conf.d/default.conf 



# Copy built app from previous stage 
COPY --from=builder /app/dist /usr/share/nginx/html 




EXPOSE 80 

CMD ["nginx", "-g", "daemon off;"] 