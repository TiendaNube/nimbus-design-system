# Instrucciones para asistentes

## Check de versiones obligatorio en cada PR

Antes de abrir o actualizar un PR hacia `master`, ejecutá `yarn bump:check` desde la rama del PR. Este es el mismo comando que corre el job `check-version` en `.github/workflows/version.yml`. Verificá que ese job quede en verde en GitHub antes de dar el PR por listo para avanzar.

Si el check pide una estrategia de release, agregá un archivo `.yarn/versions/*.yml` que cubra cada workspace modificado: `patch`, `minor` o `major` cuando corresponde publicar una versión; `declined` cuando no corresponde. No adivines por el tipo de archivo: seguí la salida de `yarn version check` y revisá el alcance del cambio. Los cambios solo en tests o stories pueden estar excluidos, pero el check igual se debe ejecutar.

No saltees ni desactives `check-version` para hacer pasar un PR. Si no podés ejecutarlo localmente, explicá por qué y esperá el resultado del job en el PR.
