// src/pages/MapView.jsx
import React, { useEffect, useRef, useState } from "react";

function MapView({ isPreview = false }) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let renderer;
    let scene;
    let camera;
    let controls;
    let isMounted = true;

    const init = async () => {
      try {
        const THREE = await import("three");
        const { OrbitControls } = await import(
          "three/examples/jsm/controls/OrbitControls.js"
        );
        const { PCDLoader } = await import(
          "three/examples/jsm/loaders/PCDLoader.js"
        );

        if (!containerRef.current || !isMounted) return;

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        scene = new THREE.Scene();
        scene.background = new THREE.Color("#f3f3f3");

        // Camera with mobile-friendly settings
        const cameraDistance = isMobile ? 25 : 30;
        camera = new THREE.PerspectiveCamera(
          isMobile ? 50 : 60,
          width / height,
          0.1,
          1000
        );
        camera.position.set(cameraDistance, cameraDistance, cameraDistance);

        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: false,
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0xf3f3f3);
        containerRef.current.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.target.set(0, 0, 0);
        controls.minDistance = 5;
        controls.maxDistance = 50;
        controls.update();

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(10, 20, 10);
        scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight2.position.set(-10, 10, -10);
        scene.add(directionalLight2);

        // Grid - responsive size
        const gridSize = isMobile ? 20 : 40;
        const gridDivisions = isMobile ? 20 : 40;
        const gridHelper = new THREE.GridHelper(
          gridSize,
          gridDivisions,
          "#4ade80",
          "#2f5d8c"
        );
        scene.add(gridHelper);

        // Robot Marker - responsive size
        const robotSize = isMobile ? 0.35 : 0.5;
        const robot = new THREE.Mesh(
          new THREE.SphereGeometry(robotSize, 32, 32),
          new THREE.MeshStandardMaterial({
            color: "#dc2626",
            emissive: "#dc2626",
            emissiveIntensity: 0.4,
          })
        );
        robot.position.set(0, robotSize, 0);
        scene.add(robot);

        // Rotating Ring - responsive size
        const ringInner = isMobile ? 0.6 : 0.8;
        const ringOuter = isMobile ? 0.9 : 1.2;
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(ringInner, ringOuter, 64),
          new THREE.MeshBasicMaterial({
            color: "#22c55e",
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide,
          })
        );
        ring.rotation.x = -Math.PI / 2;
        scene.add(ring);

        // Try to load PCD with fallback
        try {
          const loader = new PCDLoader();
          const pcdPath = "/assets/pointcloud/sample.pcd";
          
          loader.load(
            pcdPath,
            (points) => {
              if (!isMounted) return;
              const scale = isMobile ? 0.008 : 0.01;
              points.scale.set(scale, scale, scale);
              points.position.set(0, 0, 0);
              points.rotateX(-Math.PI / 2);
              scene.add(points);
              console.log("✅ PCD Loaded Successfully");
            },
            (xhr) => {
              console.log(`Loading PCD: ${(xhr.loaded / xhr.total * 100).toFixed(0)}%`);
            },
            (error) => {
              console.warn("PCD load failed, using fallback:", error);
              createFallbackPoints(scene, THREE);
            }
          );
        } catch (error) {
          console.warn("PCD loader error, using fallback:", error);
          createFallbackPoints(scene, THREE);
        }

        // Fallback function to create sample points
        function createFallbackPoints(scene, THREE) {
          const pointCount = isMobile ? 1000 : 2000;
          const geometry = new THREE.BufferGeometry();
          const positions = new Float32Array(pointCount * 3);
          const colors = new Float32Array(pointCount * 3);

          for (let i = 0; i < pointCount; i++) {
            const x = (Math.random() - 0.5) * (isMobile ? 15 : 25);
            const z = (Math.random() - 0.5) * (isMobile ? 15 : 25);
            const y = 0.05 + Math.random() * 0.1;
            
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            const gray = 0.3 + Math.random() * 0.4;
            colors[i * 3] = gray * 0.8;
            colors[i * 3 + 1] = gray * 0.9;
            colors[i * 3 + 2] = gray;
          }

          geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

          const material = new THREE.PointsMaterial({
            size: isMobile ? 0.06 : 0.08,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
          });

          const points = new THREE.Points(geometry, material);
          scene.add(points);
          console.log("✅ Fallback points created");
        }

        // Add some shelves/obstacles for reference
        const boxMat = new THREE.MeshStandardMaterial({
          color: '#2a4a6a',
          transparent: true,
          opacity: 0.15,
        });

        const boxCount = isMobile ? 8 : 15;
        for (let i = 0; i < boxCount; i++) {
          const box = new THREE.Mesh(
            new THREE.BoxGeometry(
              0.5 + Math.random() * 0.5,
              0.3 + Math.random() * 0.5,
              0.5 + Math.random() * 0.5
            ),
            boxMat
          );
          const angle = Math.random() * Math.PI * 2;
          const rad = 2 + Math.random() * (isMobile ? 6 : 10);
          box.position.set(
            Math.cos(angle) * rad,
            0.15 + Math.random() * 0.2,
            Math.sin(angle) * rad
          );
          box.rotation.y = Math.random() * Math.PI;
          scene.add(box);
        }

        // Animation loop
        let time = 0;

        function animate() {
          if (!isMounted) return;
          requestAnimationFrame(animate);
          
          time += 0.01;
          // Subtle robot movement
          if (robot) {
            robot.position.x = Math.sin(time * 0.3) * 1.5;
            robot.position.z = Math.cos(time * 0.4) * 1.5;
            ring.position.x = robot.position.x;
            ring.position.z = robot.position.z;
          }
          
          ring.rotation.z += 0.02;
          controls.update();
          renderer.render(scene, camera);
        }

        animate();

        // Handle resize
        const handleResize = () => {
          if (!containerRef.current || !isMounted) return;
          const newWidth = containerRef.current.clientWidth;
          const newHeight = containerRef.current.clientHeight;
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
          isMounted = false;
          window.removeEventListener("resize", handleResize);
          if (renderer && renderer.domElement && containerRef.current) {
            containerRef.current.removeChild(renderer.domElement);
          }
          if (renderer) renderer.dispose();
          if (controls) controls.dispose();
        };
      } catch (error) {
        console.error("Error initializing MapView:", error);
      }
    };

    const cleanupPromise = init();
    
    return () => {
      isMounted = false;
      if (cleanupPromise) {
        cleanupPromise.then(cleanupFn => {
          if (typeof cleanupFn === 'function') cleanupFn();
        });
      }
    };
  }, [isMobile, isPreview]);

  // If preview mode, render simplified version without labels
  if (isPreview) {
    return (
      <div ref={containerRef} className="w-full h-full" />
    );
  }

  return (
    <>
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* View Label - Responsive */}
      <div className={`absolute left-1/2 -translate-x-1/2 z-40 ${isMobile ? 'top-[98px]' : 'top-[70px]'}`}>
        <div className={`
          bg-black text-white rounded-xl shadow-lg font-semibold
          ${isMobile ? 'px-3 py-1 text-[10px]' : 'px-5 py-2 text-sm'}
          border border-white/10
        `}>
          {isMobile ? '3D MAP' : '3D Map View'}
        </div>
      </div>

      {/* Controls hint - Mobile only */}
      {isMobile && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40">
          <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
            <span className="text-[8px] text-white/40 tracking-wider">
              👆 DRAG TO ROTATE
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default MapView;