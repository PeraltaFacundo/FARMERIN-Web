module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }
    return config;
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/404': { page: '/404' },
      '/actualizacion': { page: '/actualizacion' },
      '/altaMasiva': { page: '/altaMasiva' },
      '/animales': { page: '/animales' },
      '/animales/[id]': { page: '/animales/[id]' },
      '/ayuda': { page: '/ayuda' },
      '/control': { page: '/control' },
      '/controlLechero': { page: '/controlLechero' },
      '/crear-cuenta': { page: '/crear-cuenta' },
      '/dirsa': { page: '/dirsa' },
      '/gralAnimales': { page: '/gralAnimales' },
      '/listados': { page: '/listados' },
      '/listados/[id]': { page: '/listados/[id]' },
      '/login': { page: '/login' },
      '/monitor': { page: '/monitor' },
      '/MOTIVODEBAJA': { page: '/MOTIVODEBAJA' },
      '/NoRegs': { page: '/NoRegs' },
      '/parametros': { page: '/parametros' },
      '/parametros/[id]': { page: '/parametros/[id]' },
      '/parteDiario': { page: '/parteDiario' },
      '/parteDiario copy': { page: '/parteDiario copy' },
      '/produccion': { page: '/produccion' },
      '/raciones': { page: '/raciones' },
      '/recepciones': { page: '/recepciones' },
      '/tambos/[id]': { page: '/tambos/[id]' },
      '/testFuncion': { page: '/testFuncion' },
      '/usuarios': { page: '/usuarios' },
    }
  }
};
