# 使用官方 Node.js 镜像作为基础镜像
FROM hub.atomgit.com/amd64/node:18-buster-slim
# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY . .

RUN npm set registry http://npm.midea.com:8090/repository/npm-public/

RUN npm install pnpm -g

# 安装依赖
RUN pnpm install

RUN pnpm build

FROM hub.atomgit.com/amd64/nginx

# 将 Vite 项目的 dist 目录复制到 Nginx 的默认静态文件目录
COPY --from=0 /app/docs/.vitepress/dist /usr/share/nginx/html


EXPOSE 80