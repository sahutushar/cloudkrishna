# Docker Deployment Guide - Cloud Krishna

## 📦 Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+
- 2GB+ RAM available
- Ports 80, 3001, 5555 available

## 🚀 Quick Start

### 1. Setup Environment Variables
```bash
# Copy and configure environment file
cp .env.docker .env
# Edit .env with your actual credentials
```

### 2. Build and Run All Services
```bash
# Build and start all containers
docker-compose up -d

# View logs
docker-compose logs -f

# Check container status
docker-compose ps
```

### 3. Access Applications
- **Frontend**: http://localhost
- **Admin Dashboard**: http://localhost:3001
- **Backend API**: http://localhost:5555/api

## 🛠️ Individual Service Commands

### Backend Only
```bash
cd backend
docker build -t cloudkrishna-backend .
docker run -p 5555:5555 --env-file ../.env cloudkrishna-backend
```

### Frontend Only
```bash
cd frontend
docker build -t cloudkrishna-frontend .
docker run -p 80:80 cloudkrishna-frontend
```

### Admin Dashboard Only
```bash
cd admin-dashboard
docker build -t cloudkrishna-admin .
docker run -p 3001:80 cloudkrishna-admin
```

## 🔄 Management Commands

### Stop All Services
```bash
docker-compose down
```

### Restart Services
```bash
docker-compose restart
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f admin
```

### Rebuild After Code Changes
```bash
# Rebuild all
docker-compose up -d --build

# Rebuild specific service
docker-compose up -d --build backend
```

### Clean Up
```bash
# Stop and remove containers, networks
docker-compose down

# Remove volumes as well
docker-compose down -v

# Remove all images
docker-compose down --rmi all
```

## 🏥 Health Checks

### Check Container Health
```bash
docker-compose ps
```

### Manual Health Check
```bash
# Backend
curl http://localhost:5555/api/health

# Frontend
curl http://localhost/health

# Admin
curl http://localhost:3001/health
```

## 🌐 Production Deployment

### 1. Setup Nginx Reverse Proxy
```bash
# Copy nginx configuration
sudo cp nginx-production.conf /etc/nginx/sites-available/cloudkrishna
sudo ln -s /etc/nginx/sites-available/cloudkrishna /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### 2. SSL Certificate (Let's Encrypt)
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d cloudkrishna.com -d www.cloudkrishna.com

# Auto-renewal
sudo certbot renew --dry-run
```

### 3. Docker Compose Production
```bash
# Set production environment
export NODE_ENV=production

# Start with production config
docker-compose -f docker-compose.yml up -d
```

## 📊 Monitoring

### Container Stats
```bash
docker stats
```

### Disk Usage
```bash
docker system df
```

### Prune Unused Resources
```bash
# Remove unused containers, networks, images
docker system prune -a

# Remove unused volumes
docker volume prune
```

## 🔐 Security Best Practices

1. **Never commit .env files**
2. **Use secrets management** for production
3. **Enable firewall** on production server
4. **Regular security updates**
   ```bash
   docker-compose pull
   docker-compose up -d
   ```
5. **Monitor logs** for suspicious activity

## 🐛 Troubleshooting

### Container Won't Start
```bash
# Check logs
docker-compose logs backend

# Inspect container
docker inspect cloudkrishna-backend
```

### Port Already in Use
```bash
# Find process using port
sudo lsof -i :5555

# Kill process
sudo kill -9 <PID>
```

### Database Connection Issues
```bash
# Verify environment variables
docker-compose exec backend env | grep MONGODB

# Test connection from container
docker-compose exec backend node -e "console.log(process.env.MONGODB_URI)"
```

### Build Cache Issues
```bash
# Build without cache
docker-compose build --no-cache

# Remove all and rebuild
docker-compose down
docker system prune -a
docker-compose up -d --build
```

## 📈 Scaling

### Horizontal Scaling
```bash
# Scale backend to 3 instances
docker-compose up -d --scale backend=3

# With load balancer
docker-compose -f docker-compose.yml -f docker-compose.scale.yml up -d
```

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
- name: Build and Push Docker Images
  run: |
    docker-compose build
    docker-compose push
```

### Deploy to Production
```bash
# Pull latest images
docker-compose pull

# Restart with zero downtime
docker-compose up -d --no-deps --build backend
```

## 📝 Notes

- **Development**: Use `docker-compose up` without `-d` to see logs
- **Production**: Always use `-d` flag for detached mode
- **Backup**: Regular database backups outside containers
- **Updates**: Pull latest images weekly for security patches

## 🆘 Support

For issues:
1. Check logs: `docker-compose logs -f`
2. Verify environment variables
3. Check port availability
4. Review Docker documentation

---

**Cloud Krishna Community** - Dockerized for scalability and reliability 🚀
