<?php
include('db.php');

if ($_GET['tsql']=="proyecto") {

  $tsql="SELECT CodigoProyecto
  ,Proyecto
  ,CONVERT(VARCHAR(10), FechaAprobacion,103) as inicio
  ,CONVERT(VARCHAR(10), Tm_FechaPrevistaFIn,103) as fin
  ,DATEDIFF(day, FechaAprobacion, Tm_FechaPrevistaFIn) as duracion
  ,CONVERT(VARCHAR(10), dateadd(week,-2,getdate()),103) as dosAtras
  FROM [LC_MILENIO].[dbo].[Vis_TM_ProyectosCola]
  where (FechaAprobacion is not null and Tm_FechaPrevistaFIn is not null)
  and _EstadoProyecto <>'14'
  and CodigoEmpresa = 7
  and Tm_FechaPrevistaFIn>dateadd(week,-2,getdate())
  order by Tm_FechaPrevistaFIn";

}else if ($_GET['tsql']=="visita") {

  $tsql="SELECT CodigoProyecto,Proyecto
  ,CONVERT(VARCHAR(10)
  ,FechaInicio,103) as inicio
  ,CONVERT(VARCHAR(10), FechaTope,103) as fin
  ,DATEDIFF(day, FechaInicio, FechaTope) as duracion
  ,CONVERT(VARCHAR(10), dateadd(week,-2,getdate()),103) as dosAtras
  FROM Vis_TM_LisTareas WHERE	(CodigoEmpresa = 7)
  AND (TM_CodigoTipoTarea = '2')
  AND FechaTope between dateadd(week,-2,getdate())
  AND FechaFin IS NULL AND TM_EjercicioTareaPadre=0";

}else if ($_GET['tsql']=="fotomontaje") {

  $tsql="";

}else if ($_GET['tsql']=="inc") {

  $tsql="";

}else if ($_GET['tsql']=="adm") {

  $tsql="";

}



$stsm = $pdo->prepare($tsql);
$stsm->execute();
$rows = $stsm->fetchall(PDO::FETCH_ASSOC);

// print_r($rows);

$buffer = new stdClass();

foreach ($rows as $value) {
  $buffer -> data[] = array('CodigoProyecto'=>$value['CodigoProyecto'],
                                'Proyecto'=>$value['Proyecto'],
                                'inicio'=>$value['inicio'],
                                'fin'=>$value['fin'],
                                'duracion'=>$value['duracion'],
                                'dosAtras'=>$value['dosAtras']

                              );
}

echo json_encode($buffer);

?>
