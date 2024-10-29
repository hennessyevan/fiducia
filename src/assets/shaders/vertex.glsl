  varying vec3 vP;
  varying vec3 vN;
  varying vec2 vUv;
  uniform highp sampler2D uTextureNormal;
  varying vec3 vWorldPos;
  varying vec3 vWorldSpaceNormal;

  void main() {
    vP = position;
    vN = normal;
    vUv = uv;
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    vWorldSpaceNormal = (modelMatrix * vec4(vN, 0.0)).xyz;
}