import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as THREE from 'three';

const SolarSystem = () => {
  const mountRef = useRef(null);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/planet/get')
  .then(response => {
    console.log('API Response:', response.data); // Check this
    setPlanets(response.data.data);
  })
  .catch(err => console.log(err));

  }, []);

  useEffect(() => {
    if (planets.length === 0) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000); // Black background
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 200;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    // Planets setup
    const planetMeshes = planets.map((planet) => {
      const geometry = new THREE.SphereGeometry(planet.size || 5, 32, 32);
      const material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
      const mesh = new THREE.Mesh(geometry, material);

      const radius = planet.distanceFromSun / 5 || 30; // scale down distance
      const angle = Math.random() * 2 * Math.PI;

      mesh.position.x = radius * Math.cos(angle);
      mesh.position.z = radius * Math.sin(angle);
      scene.add(mesh);

      return {
        mesh,
        radius,
        angle,
        speed: planet.orbitSpeed / 1000 || 0.01, // scale orbit speed
      };
    });

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      planetMeshes.forEach((planet) => {
        planet.angle += planet.speed;
        planet.mesh.position.x = planet.radius * Math.cos(planet.angle);
        planet.mesh.position.z = planet.radius * Math.sin(planet.angle);
        planet.mesh.rotation.y += 0.01;
      });
      renderer.render(scene, camera);
    };

    animate();

    // Handle resizing
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [planets]);

  return <div className="w-full h-screen bg-black" ref={mountRef}></div>;
};

export default SolarSystem;
