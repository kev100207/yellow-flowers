// Configuración de la escena 3D con Three.js
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Galaxia de partículas amarillas y doradas brillantes
const particleCount = 2000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
  // Posiciones tridimensionales en espiral / galaxia
  const radius = Math.random() * 7;
  const spinAngle = radius * 2;
  const branchAngle = ((i % 5) / 5) * Math.PI * 2;

  const randomX = (Math.random() - 0.5) * 0.8;
  const randomY = (Math.random() - 0.5) * 0.8;
  const randomZ = (Math.random() - 0.5) * 0.8;

  positions[i] = Math.cos(branchAngle + spinAngle) * radius + randomX;
  positions[i + 1] = randomY;
  positions[i + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

  // Tonalidades de amarillo girasol, oro y blanco brillante
  colors[i] = 1.0; 
  colors[i + 1] = 0.85 + Math.random() * 0.15; 
  colors[i + 2] = Math.random() * 0.3; 
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  size: 0.06,
  vertexColors: true,
  transparent: true,
  opacity: 0.95
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Animación de rotación 3D
function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.0015;
  particles.rotation.x += 0.0005;
  renderer.render(scene, camera);
}
animate();

// Responsivo ante cambios de pantalla
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
