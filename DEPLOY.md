# Deploying to a home server (Ubuntu + Docker + Cloudflare Tunnel)

This setup runs the site in Docker and exposes it publicly at **harisaran.dev**
through a **Cloudflare Tunnel** — an outbound connection, so it works behind
Free's shared IPv4 (CGNAT) with **no port-forwarding** and free HTTPS.

## 1. Server prerequisites (once)

On the Ubuntu server (LAN IP `192.168.1.10`):

```bash
# Install Docker Engine + Compose plugin
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER   # log out/in afterwards
```

## 2. Put harisaran.dev on Cloudflare (once)

1. Create a free account at https://dash.cloudflare.com and **Add a site** → `harisaran.dev`.
2. Cloudflare shows two nameservers. Set them at your domain registrar (where you
   bought harisaran.dev). Wait for the zone to go **Active** (minutes to a few hours).

## 3. Create the tunnel and get a token (once)

1. Go to **Cloudflare Zero Trust** → **Networks → Tunnels → Create a tunnel**.
2. Choose **Cloudflared**, name it (e.g. `home-server`), **Save**.
3. On the "Install connector" screen, copy the **token** — the long string after
   `--token` (starts with `eyJ...`). That's your `TUNNEL_TOKEN`.
4. Add a **Public Hostname**:
   - Subdomain: *(blank)*  Domain: `harisaran.dev`
   - Service: **HTTP** → `app:3000`
   - (Optional) add a second hostname `www` → same service.

## 4. Deploy

```bash
git clone https://github.com/HARISARAN404/portfolio.git
cd portfolio
cp .env.example .env
nano .env            # paste TUNNEL_TOKEN=eyJ...
docker compose up -d --build
```

Visit **https://harisaran.dev** — Cloudflare terminates HTTPS at its edge and
forwards to the container. Done.

Check status / logs:

```bash
docker compose ps
docker compose logs -f cloudflared   # should say "Registered tunnel connection"
```

## 5. Updating the site later

```bash
cd portfolio
git pull
docker compose up -d --build
```

## LAN-only alternative (no tunnel)

To reach it only inside your network while testing: in `docker-compose.yml`
comment out the `expose` block under `app`, uncomment the `ports: ["3000:3000"]`
block, and run `docker compose up -d --build app`. Then browse to
`http://192.168.1.10:3000`.

---

### Note on Free / Freebox IPv4 Full Stack

With the Cloudflare Tunnel you do **not** need a dedicated public IPv4, so the
Freebox port-forward restriction (source port 49152–65535) is irrelevant. If you
still want a dedicated IPv4 for other services, request **IPv4 Full Stack** from
the Freebox OS web UI at `mafreebox.freebox.fr` (not the mobile app):
**Paramètres de la Freebox → Connexion Internet → Configuration IPv4**.
