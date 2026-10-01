"""
Contax360 Vault Room Arcade
Module providing:
  - get_html(): Returns standalone, high-fidelity playable arcade HTML5 canvas game
  - run_server(port=8080): Runs a standalone HTTP server serving the arcade room
  - mount_fastapi(app, path="/arcade"): Mounts the arcade room into a FastAPI application
  - mount_flask(app, path="/arcade"): Mounts the arcade room into a Flask application
"""

import sys
import http.server
import socketserver

def get_html():
    """Returns the complete playable HTML5 Arcade Vault Room application."""
    return """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contax360 Vault Room • Executive Arcade</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #060913;
      color: #e2e8f0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 16px;
      overflow-x: hidden;
    }
    .arcade-cabinet {
      background: #0f172a;
      border: 3px solid #3b82f6;
      border-radius: 20px;
      box-shadow: 0 0 40px rgba(59, 130, 246, 0.4), inset 0 0 20px rgba(0,0,0,0.8);
      max-width: 680px;
      width: 100%;
      padding: 24px;
      position: relative;
    }
    .marquee {
      background: linear-gradient(90deg, #1e3a8a, #2563eb, #1e3a8a);
      border-bottom: 2px solid #60a5fa;
      padding: 12px;
      text-align: center;
      border-radius: 12px 12px 0 0;
      margin: -24px -24px 20px -24px;
    }
    .marquee h1 {
      font-size: 20px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #fff;
      text-shadow: 0 0 10px #60a5fa;
      font-weight: 900;
    }
    .marquee p {
      font-size: 11px;
      letter-spacing: 2px;
      color: #93c5fd;
      margin-top: 4px;
      text-transform: uppercase;
    }
    .screen-container {
      position: relative;
      background: #000;
      border: 4px solid #1e293b;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: inset 0 0 30px rgba(0, 255, 204, 0.2);
    }
    .scanlines {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
      background-size: 100% 3px, 6px 100%;
      pointer-events: none;
      z-index: 5;
    }
    canvas {
      display: block;
      width: 100%;
      height: 380px;
      background: #020617;
    }
    .stats-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #1e293b;
      font-family: monospace;
      font-size: 13px;
    }
    .stat-badge {
      color: #38bdf8;
      font-weight: bold;
    }
    .controls-panel {
      margin-top: 16px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
    .btn {
      background: linear-gradient(180deg, #2563eb, #1d4ed8);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 12px;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
      transition: all 0.2s;
    }
    .btn:hover {
      background: linear-gradient(180deg, #3b82f6, #2563eb);
      transform: translateY(-1px);
    }
    .btn:active { transform: translateY(1px); }
    .btn-secondary {
      background: #1e293b;
      border: 1px solid #334155;
      box-shadow: none;
    }
    .btn-secondary:hover { background: #334155; }
    .touch-controls {
      display: flex;
      gap: 12px;
      width: 100%;
      margin-top: 12px;
    }
    .touch-btn {
      flex: 1;
      padding: 14px;
      background: #1e293b;
      border: 1px solid #3b82f6;
      border-radius: 8px;
      color: #38bdf8;
      font-size: 18px;
      font-weight: bold;
      user-select: none;
      text-align: center;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="arcade-cabinet">
    <div class="marquee">
      <h1>The Vault Room</h1>
      <p>Contax360 Executive Arcade Edition • Port 8080</p>
    </div>

    <div class="stats-bar">
      <div>SCORE: <span id="scoreVal" class="stat-badge">00000</span></div>
      <div>LIVES: <span id="livesVal" class="stat-badge">❤❤❤</span></div>
      <div>VAULT LEVEL: <span id="levelVal" class="stat-badge">1</span></div>
      <div>HIGH SCORE: <span id="highScoreVal" class="stat-badge">12450</span></div>
    </div>

    <div class="screen-container">
      <div class="scanlines"></div>
      <canvas id="gameCanvas" width="600" height="380"></canvas>
    </div>

    <div class="controls-panel">
      <div>
        <button id="startBtn" class="btn">Launch Game</button>
        <button id="pauseBtn" class="btn btn-secondary">Pause</button>
      </div>
      <span style="font-size: 11px; color: #94a3b8; font-family: monospace;">
        Controls: ← / → Arrow Keys or Drag Paddle
      </span>
    </div>

    <div class="touch-controls">
      <div id="btnLeft" class="touch-btn">◀ LEFT</div>
      <div id="btnRight" class="touch-btn">RIGHT ▶</div>
    </div>
  </div>

  <script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreVal = document.getElementById('scoreVal');
    const livesVal = document.getElementById('livesVal');
    const levelVal = document.getElementById('levelVal');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');

    let score = 0;
    let lives = 3;
    let level = 1;
    let gameRunning = false;
    let isPaused = false;
    let animationId = null;

    const paddle = {
      width: 90,
      height: 12,
      x: (canvas.width - 90) / 2,
      y: canvas.height - 24,
      speed: 7,
      dx: 0
    };

    const ball = {
      x: canvas.width / 2,
      y: canvas.height - 40,
      radius: 6,
      speed: 4,
      dx: 3,
      dy: -3
    };

    const brickRowCount = 5;
    const brickColumnCount = 8;
    const brickWidth = 62;
    const brickHeight = 16;
    const brickPadding = 9;
    const brickOffsetTop = 40;
    const brickOffsetLeft = 20;

    let bricks = [];
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#6366f1'];

    function initBricks() {
      bricks = [];
      for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
          bricks[c][r] = { x: 0, y: 0, status: 1, color: colors[r % colors.length] };
        }
      }
    }

    function drawBall() {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#38bdf8';
      ctx.fill();
      ctx.closePath();
      ctx.shadowBlur = 0;
    }

    function drawPaddle() {
      ctx.beginPath();
      ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 6);
      ctx.fillStyle = '#60a5fa';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#2563eb';
      ctx.fill();
      ctx.closePath();
      ctx.shadowBlur = 0;
    }

    function drawBricks() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 3);
            ctx.fillStyle = bricks[c][r].color;
            ctx.shadowBlur = 4;
            ctx.shadowColor = bricks[c][r].color;
            ctx.fill();
            ctx.closePath();
            ctx.shadowBlur = 0;
          }
        }
      }
    }

    function collisionDetection() {
      let activeCount = 0;
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            activeCount++;
            if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
              ball.dy = -ball.dy;
              b.status = 0;
              score += 25 * level;
              scoreVal.textContent = String(score).padStart(5, '0');
            }
          }
        }
      }
      if (activeCount === 0) {
        level++;
        levelVal.textContent = level;
        initBricks();
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 40;
        ball.speed += 0.5;
        ball.dx = 3;
        ball.dy = -3;
      }
    }

    function update() {
      if (!gameRunning || isPaused) return;

      paddle.x += paddle.dx;
      if (paddle.x < 0) paddle.x = 0;
      if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;

      ball.x += ball.dx;
      ball.y += ball.dy;

      if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
      }
      if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
      } else if (ball.y + ball.radius > paddle.y) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
          const hitPos = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
          ball.dx = hitPos * 5;
          ball.dy = -Math.abs(ball.dy);
        } else if (ball.y + ball.radius > canvas.height) {
          lives--;
          livesVal.textContent = '❤'.repeat(Math.max(0, lives));
          if (lives <= 0) {
            gameRunning = false;
            startBtn.textContent = 'Game Over • Play Again';
            return;
          } else {
            ball.x = canvas.width / 2;
            ball.y = canvas.height - 40;
            ball.dx = 3;
            ball.dy = -3;
          }
        }
      }

      collisionDetection();
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawBall();
      drawPaddle();

      if (!gameRunning) {
        ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#60a5fa';
        ctx.font = 'bold 22px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('THE VAULT ROOM ARCADE', canvas.width / 2, canvas.height / 2 - 10);
        ctx.font = '13px monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('PRESS LAUNCH GAME TO PLAY', canvas.width / 2, canvas.height / 2 + 20);
      }
    }

    function loop() {
      update();
      draw();
      animationId = requestAnimationFrame(loop);
    }

    initBricks();
    draw();

    startBtn.addEventListener('click', () => {
      if (!gameRunning) {
        score = 0;
        lives = 3;
        level = 1;
        scoreVal.textContent = '00000';
        livesVal.textContent = '❤❤❤';
        levelVal.textContent = '1';
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 40;
        ball.dx = 3;
        ball.dy = -3;
        initBricks();
        gameRunning = true;
        isPaused = false;
        startBtn.textContent = 'Restart';
        if (!animationId) loop();
      } else {
        gameRunning = false;
        startBtn.textContent = 'Launch Game';
      }
    });

    pauseBtn.addEventListener('click', () => {
      if (gameRunning) {
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'd') paddle.dx = paddle.speed;
      if (e.key === 'ArrowLeft' || e.key === 'a') paddle.dx = -paddle.speed;
    });

    window.addEventListener('keyup', (e) => {
      if (['ArrowRight', 'd', 'ArrowLeft', 'a'].includes(e.key)) paddle.dx = 0;
    });

    btnLeft.addEventListener('pointerdown', () => { paddle.dx = -paddle.speed; });
    btnLeft.addEventListener('pointerup', () => { paddle.dx = 0; });
    btnRight.addEventListener('pointerdown', () => { paddle.dx = paddle.speed; });
    btnRight.addEventListener('pointerup', () => { paddle.dx = 0; });

    canvas.addEventListener('touchmove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      paddle.x = (touchX / rect.width) * canvas.width - paddle.width / 2;
    });
  </script>
</body>
</html>"""


class ArcadeHTTPHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        html = get_html()
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(html.encode("utf-8"))))
        self.end_headers()
        self.wfile.write(html.encode("utf-8"))

    def log_message(self, format, *args):
        # Clean logging
        sys.stderr.write(f"[Arcade Room Server] {self.address_string()} - {format % args}\n")


def run_server(port=8080):
    """
    Runs standalone HTTP server on the designated port.
    Usage:
        from arcade_room import run_server
        run_server(8080)
    """
    with socketserver.TCPServer(("", port), ArcadeHTTPHandler) as httpd:
        print(f"[Vault Arcade] Serving on http://localhost:{port} (Port {port})")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[Vault Arcade] Server stopped.")


def mount_fastapi(app, path="/arcade"):
    """
    Mounts the arcade room into a FastAPI application.
    Usage:
        from arcade_room import mount_fastapi
        mount_fastapi(app, "/vault-arcade")
    """
    from fastapi.responses import HTMLResponse
    @app.get(path, response_class=HTMLResponse)
    async def arcade_endpoint():
        return HTMLResponse(content=get_html(), status_code=200)
    return app


def mount_flask(app, path="/arcade"):
    """
    Mounts the arcade room into a Flask application.
    Usage:
        from arcade_room import mount_flask
        mount_flask(app, "/vault-arcade")
    """
    @app.route(path)
    def arcade_endpoint():
        return get_html(), 200, {"Content-Type": "text/html; charset=utf-8"}
    return app


if __name__ == "__main__":
    port = 8080
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass
    run_server(port)
