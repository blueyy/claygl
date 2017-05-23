define(function () {
return "@export qtek.deferred.ambient_cubemap_light\n\n@import qtek.deferred.chunk.light_head\n\nuniform vec3 lightColor;\nuniform samplerCube lightCubemap;\nuniform sampler2D brdfLookup;\n\nuniform vec3 eyePosition;\n\n@import qtek.util.rgbm\n\nvoid main()\n{\n @import qtek.deferred.chunk.gbuffer_read\n\n vec3 V = normalize(eyePosition - position);\n vec3 L = reflect(-V, N);\n\n float ndv = clamp(dot(N, V), 0.0, 1.0);\n float rough = clamp(1.0 - glossiness, 0.0, 1.0);\n float bias = rough * 5.0;\n vec2 brdfParam = texture2D(brdfLookup, vec2(rough, ndv)).xy;\n vec3 envWeight = specularColor * brdfParam.x + brdfParam.y;\n\n vec3 envTexel = RGBMDecode(textureCubeLodEXT(lightCubemap, L, bias), 51.5);\n gl_FragColor.rgb = lightColor * envTexel * envWeight;\n\n gl_FragColor.a = 1.0;\n}\n@end";
});