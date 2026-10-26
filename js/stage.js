// ── STAGE: shared three.js setup for the gallery viewer and the thumbnail tool ──
window.Stage = (function () {
  const loader = new THREE.GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);

  // Models were exported with flat normals stripped; GLTFLoader falls back to
  // flat shading, which matches the original faceted look.
  function load(url, onProgress) {
    return new Promise((resolve, reject) => {
      loader.load(url, gltf => {
        gltf.scene.traverse(o => {
          if (!o.isMesh) return;
          const m = o.material;
          m.side = THREE.DoubleSide;
          if (!m.roughnessMap && m.roughness === 1) m.roughness = 0.65;
        });
        resolve(gltf.scene);
      }, e => { if (onProgress && e.total) onProgress(e.loaded / e.total); }, reject);
    });
  }

  function makeRenderer(opts) {
    const r = new THREE.WebGLRenderer(Object.assign({ antialias: true }, opts));
    r.outputEncoding = THREE.sRGBEncoding;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.1;
    return r;
  }

  function addLights(scene) {
    scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    const d = new THREE.DirectionalLight(0xffffff, 1.5); d.position.set(4, 7, 5); scene.add(d);
    const f = new THREE.DirectionalLight(0xdde8ff, 0.35); f.position.set(-3, 1, -3); scene.add(f);
  }

  // centre the model at the origin; returns its bounding-box diagonal
  function fit(model) {
    const box = new THREE.Box3().setFromObject(model);
    model.position.sub(box.getCenter(new THREE.Vector3()));
    return box.getSize(new THREE.Vector3()).length();
  }

  return { load, makeRenderer, addLights, fit };
})();
