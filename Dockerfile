# Step 1: Create the build artifacts
FROM node:22.14.0-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent

COPY . ./

# Build with placeholder env vars (empty strings)
ENV VITE_HOST_ENV=""
ENV VITE_VERSION=""
ENV VITE_CONTROL_PANEL_API=""
ENV VITE_VIEWER_API=""
ENV VITE_VIEWER_JWT_KEY=""
ENV VITE_GOOGLE_MAPS_KEY=""
ENV VITE_PUBLIC_POSTHOG_KEY=""
ENV VITE_GA_TRACKING_ID=""
ENV VITE_MIXPANEL_KEY=""
ENV VITE_HOSTNAME_PARTS=""
ENV VITE_SWAP_CP=""
ENV VITE_VIEWER_PAGE_SUBDOMAIN=""
ENV VITE_GITHUB_JS_PATH=""
ENV VITE_CDN_JS_PATH=""
ENV VITE_SOCIAL_META=""

RUN npm run build

# Step 2: Create the compact production image
FROM node:22.14.0-alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
RUN npm install serve -g --silent

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
# start the web server
CMD ["serve", "-s", "/app/dist"]