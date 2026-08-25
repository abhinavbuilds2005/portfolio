import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHeroCanvasProps {
  accentColor?: string;
}

export const ThreeHeroCanvas: React.FC<ThreeHeroCanvasProps> = ({ accentColor = '#00f2ff' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all 3D neural elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Color conversion
    const primaryColor = new THREE.Color(accentColor);
    const secondaryColor = new THREE.Color('#8b5cf6');

    // 1. NEURAL NODES & PARTICLES (Sphere Distribution)
    const particleCount = 140;
    const radius = 38;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOriginals = new Float32Array(particleCount * 3);
    const nodeVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius * Math.cbrt(Math.random() * 0.7 + 0.3);

      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleOriginals[i * 3] = x;
      particleOriginals[i * 3 + 1] = y;
      particleOriginals[i * 3 + 2] = z;

      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.04,
        y: (Math.random() - 0.5) * 0.04,
        z: (Math.random() - 0.5) * 0.04,
      });
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle Material with Soft Glowing Circular Texture
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(0, 242, 255, 0.8)');
        gradient.addColorStop(0.7, 'rgba(0, 242, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 3.2,
      map: createCircleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: primaryColor,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
    mainGroup.add(particleSystem);

    // 2. DYNAMIC NEURAL CONNECTIONS (Lines between near points)
    const maxLineConnections = 300;
    const linePositions = new Float32Array(maxLineConnections * 6);
    const lineColors = new Float32Array(maxLineConnections * 6);

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    mainGroup.add(linesMesh);

    // 3. CYBERNETIC ORBITING RINGS
    const ringGeometry1 = new THREE.TorusGeometry(46, 0.2, 16, 100);
    const ringMaterial1 = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });
    const ring1 = new THREE.Mesh(ringGeometry1, ringMaterial1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ringGeometry2 = new THREE.TorusGeometry(52, 0.15, 16, 120);
    const ringMaterial2 = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const ring2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    mainGroup.add(ring2);

    // 4. FLOATING DATA STARFIELD
    const starCount = 350;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 250;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 250;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200 - 50;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 1.4,
      color: new THREE.Color('#38bdf8'),
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Mouse Interaction
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Group rotation
      mainGroup.rotation.y = elapsedTime * 0.12 + mouseX * 0.5;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.08) * 0.2 + mouseY * 0.4;
      mainGroup.rotation.z = Math.cos(elapsedTime * 0.05) * 0.1;

      // Rings differential spin
      ring1.rotation.z += 0.005;
      ring2.rotation.y -= 0.004;

      // Starfield parallax
      starField.rotation.y = elapsedTime * 0.02 + mouseX * 0.1;
      starField.rotation.x = mouseY * 0.1;

      // Update particle positions
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        // Jitter oscillation
        positions[idx] = particleOriginals[idx] + Math.sin(elapsedTime * 1.5 + i) * 1.2;
        positions[idx + 1] = particleOriginals[idx + 1] + Math.cos(elapsedTime * 1.2 + i * 2) * 1.2;
        positions[idx + 2] = particleOriginals[idx + 2] + Math.sin(elapsedTime * 1.8 + i * 3) * 1.2;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Calculate connections
      let lineVertexIdx = 0;
      let colorVertexIdx = 0;
      const connectionDist = 18;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          if (lineVertexIdx >= maxLineConnections * 6) break;

          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDist) {
            const alpha = 1.0 - dist / connectionDist;

            // Point A
            linePositions[lineVertexIdx++] = positions[i * 3];
            linePositions[lineVertexIdx++] = positions[i * 3 + 1];
            linePositions[lineVertexIdx++] = positions[i * 3 + 2];

            // Point B
            linePositions[lineVertexIdx++] = positions[j * 3];
            linePositions[lineVertexIdx++] = positions[j * 3 + 1];
            linePositions[lineVertexIdx++] = positions[j * 3 + 2];

            // Gradient colors
            lineColors[colorVertexIdx++] = primaryColor.r * alpha;
            lineColors[colorVertexIdx++] = primaryColor.g * alpha;
            lineColors[colorVertexIdx++] = primaryColor.b * alpha;

            lineColors[colorVertexIdx++] = secondaryColor.r * alpha;
            lineColors[colorVertexIdx++] = secondaryColor.g * alpha;
            lineColors[colorVertexIdx++] = secondaryColor.b * alpha;
          }
        }
      }

      linesGeometry.setDrawRange(0, lineVertexIdx / 3);
      linesGeometry.attributes.position.needsUpdate = true;
      linesGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particleMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      ringGeometry1.dispose();
      ringMaterial1.dispose();
      ringGeometry2.dispose();
      ringMaterial2.dispose();
    };
  }, [accentColor]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-85"
      style={{ filter: 'drop-shadow(0 0 20px rgba(0, 242, 255, 0.15))' }}
    />
  );
};
