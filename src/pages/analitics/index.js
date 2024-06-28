import React, { useEffect, useRef } from 'react';
import axios from "axios";

import * as d3 from 'd3';
import "../../app/FlipCard.css"

const EQUIPO_1 = "Suiza"
const EQUIPO_2 = "Italia"

import { BoxPlot } from "../graphs/boxPlot"
import { PieChart } from "../graphs/pieChart"
import { RadarChart } from '../graphs/radarChart';
import { StackedAreaChart } from '../graphs/StackedAreaChart';
import { LineChart } from '../graphs/lineChart';
import { FlipCard } from '../../../components/flipCard'
import { BarChart } from '../graphs/barChart';
import { RadarChartAtack } from '../graphs/radarChartAtack';

const App = ({
  t_1_local_stats,
  t_1_visit_stats,
  t_2_local_stats,
  t_2_visit_stats,
}) => {
  /** BoxPlot chart GOLES*/
  //console.log(t_1_local_stats[0].local_goals)

  //goles de equipo 1
  let i = 0
  let team_1_goals = []
  while (i < t_1_local_stats.length) {
    team_1_goals.push(t_1_local_stats[i].local_goals)
    i++
  }
  i = 0
  while (i < t_1_visit_stats.length) {
    team_1_goals.push(t_1_visit_stats[i].visit_goals)
    i++
  }
  i = 0
  //goles de equipo 2
  let team_2_goals = []

  while (i < t_2_local_stats.length) {
    team_2_goals.push(t_2_local_stats[i].local_goals)
    i++
  }
  i = 0
  while (i < t_2_visit_stats.length) {
    team_2_goals.push(t_2_visit_stats[i].visit_goals)
    i++
  }
  i = 0
  //goles totales

  let goles_totales = []
  while (i < team_1_goals.length) {
    goles_totales.push(team_1_goals[i])
    i++
  }
  i = 0
  while (i < team_2_goals.length) {
    goles_totales.push(team_2_goals[i])
    i++
  }
  i = 0


  const data1 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const data2 = [15, 25, 35, 45, 55, 65, 75, 85, 95, 105];

  /** Pie chart */
  // t_1_local_stats,
  // t_1_visit_stats,
  // t_2_local_stats,
  // t_2_visit_stats

  let t_ama_1 = []
  let t_roj_1 = []
  let faltas_1 = []

  let t_ama_2 = []
  let t_roj_2 = []
  let faltas_2 = []

  while (i < t_1_local_stats.length) {
    t_ama_1.push(t_1_local_stats[i].tarjetas_ama)
    t_roj_1.push(t_1_local_stats[i].tarjetas_rojas)
    faltas_1.push(t_1_local_stats[i].faltas)
    i++
  }
  i = 0
  while (i < t_1_visit_stats.length) {
    t_ama_1.push(t_1_visit_stats[i].tarjetas_ama)
    t_roj_1.push(t_1_visit_stats[i].tarjetas_rojas)
    faltas_1.push(t_1_visit_stats[i].faltas)
    i++
  }
  i = 0

  while (i < t_2_local_stats.length) {
    t_ama_2.push(t_2_local_stats[i].tarjetas_ama)
    t_roj_2.push(t_2_local_stats[i].tarjetas_rojas)
    faltas_2.push(t_2_local_stats[i].faltas)
    i++
  }
  i = 0
  while (i < t_2_visit_stats.length) {
    t_ama_2.push(t_2_visit_stats[i].tarjetas_ama)
    t_roj_2.push(t_2_visit_stats[i].tarjetas_rojas)
    faltas_2.push(t_2_visit_stats[i].faltas)
    i++
  }
  i = 0

  const suma_tar_ama_t_1 = t_ama_1.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const suma_tar_roj_t_1 = t_roj_1.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const suma_faltas_t_1 = faltas_1.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const suma_tar_ama_t_2 = t_ama_2.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const suma_tar_roj_t_2 = t_roj_2.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const suma_faltas_t_2 = faltas_2.reduce((accumulator, currentValue) => accumulator + currentValue, 0);


  const media_tarj_ama_t_1 = suma_tar_ama_t_1 / t_ama_1.length;
  const media_tarj_roj_t_1 = suma_tar_roj_t_1 / t_roj_1.length;
  const media_faltas_t_1 = suma_faltas_t_1 / faltas_1.length;

  const media_tarj_ama_t_2 = suma_tar_ama_t_2 / t_ama_2.length;
  const media_tarj_roj_t_2 = suma_tar_roj_t_2 / t_roj_2.length;
  const media_faltas_t_2 = suma_faltas_t_2 / faltas_2.length;

  //console.log(t_1_local_stats[0].faltas)
  //console.log(t_1_local_stats)
  const pie_data_t_1 = [
    { label: 'Amarillas', value: media_tarj_ama_t_1 },
    { label: 'Rojas', value: media_tarj_roj_t_1 },
    { label: 'Faltas', value: media_faltas_t_1 },
  ];

  const pie_data_t_2 = [
    { label: 'Amarillas', value: media_tarj_ama_t_2 },
    { label: 'Rojas', value: media_tarj_roj_t_2 },
    { label: 'Faltas', value: media_faltas_t_2 },
  ];

  /** Radar chart PASES*/
  //console.log(t_1_local_stats[0].pases_completados)

  let pases_c_team_1 = []
  let pases_c_team_2 = []

  while (i < t_1_local_stats.length) {
    pases_c_team_1.push(t_1_local_stats[i].pases_completados)
    i++
  }
  i = 0

  while (i < t_1_visit_stats.length) {
    pases_c_team_1.push(t_1_visit_stats[i].pases_completados)
    i++
  }
  i = 0

  while (i < t_2_local_stats.length) {
    pases_c_team_2.push(t_2_local_stats[i].pases_completados)
    i++
  }
  i = 0

  while (i < t_2_local_stats.length) {
    pases_c_team_2.push(t_2_local_stats[i].pases_completados)
    i++
  }

  const suma_pases_c_team_1 = pases_c_team_1.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const suma_pases_c_team_2 = pases_c_team_2.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const media_pases_t_1 = suma_pases_c_team_1 / pases_c_team_1.length;
  const media_pases_t_2 = suma_pases_c_team_2 / pases_c_team_2.length;

  let pases_totales_est = []
  i = 0
  while (i < pases_c_team_1.length) {
    pases_totales_est.push(pases_c_team_1[i])
    i++
  }
  i = 0
  while (i < pases_c_team_2.length) {
    pases_totales_est.push(pases_c_team_2[i])
    i++
  }
  i = 0

  // t_1_local_stats,
  // t_1_visit_stats,
  // t_2_local_stats,
  // t_2_local_stats
  const data_radar = [
    [
      { axis: "A", value: pases_c_team_1[0] },
      { axis: "B", value: pases_c_team_1[1] },
      { axis: "C", value: pases_c_team_1[2] },
      { axis: "D", value: pases_c_team_1[3] },
      { axis: "E", value: pases_c_team_1[4] },
      { axis: "F", value: pases_c_team_1[5] },
      { axis: "G", value: pases_c_team_1[6] },
      { axis: "H", value: pases_c_team_1[7] },
      { axis: "I", value: pases_c_team_1[8] },
      { axis: "J", value: pases_c_team_1[9] }
    ],
    [
      { axis: "A", value: pases_c_team_2[0] },
      { axis: "B", value: pases_c_team_2[1] },
      { axis: "C", value: pases_c_team_2[2] },
      { axis: "D", value: pases_c_team_2[3] },
      { axis: "E", value: pases_c_team_2[4] },
      { axis: "F", value: pases_c_team_2[5] },
      { axis: "G", value: pases_c_team_2[6] },
      { axis: "H", value: pases_c_team_2[7] },
      { axis: "I", value: pases_c_team_2[8] },
      { axis: "J", value: pases_c_team_2[9] }
    ]
  ];

  /** Stacked chart REMATES*/

  // t_1_local_stats,
  // t_1_visit_stats,
  // t_2_local_stats,
  // t_2_visit_stats,

  let j = 0
  let remates_total_t_1 = []
  let remates_puerta_t_1 = []
  let remates_fuera_t_1 = []

  let remates_total_t_2 = []
  let remates_puerta_t_2 = []
  let remates_fuera_t_2 = []

  while (j < t_1_local_stats.length) {
    remates_total_t_1.push(t_1_local_stats[j].total_rem)
    remates_puerta_t_1.push(t_1_local_stats[j].remates_puer)
    remates_fuera_t_1.push(t_1_local_stats[j].remates_fue)
    j++
  }
  j = 0

  while (j < t_1_visit_stats.length) {
    remates_total_t_1.push(t_1_visit_stats[j].total_rem)
    remates_puerta_t_1.push(t_1_visit_stats[j].remates_puer)
    remates_fuera_t_1.push(t_1_visit_stats[j].remates_fue)
    j++
  }
  j = 0

  while (j < t_2_local_stats.length) {
    remates_total_t_2.push(t_2_local_stats[j].total_rem)
    remates_puerta_t_2.push(t_2_local_stats[j].remates_puer)
    remates_fuera_t_2.push(t_2_local_stats[j].remates_fue)
    j++
  }
  j = 0

  while (j < t_2_visit_stats.length) {
    remates_total_t_2.push(t_2_visit_stats[j].total_rem)
    remates_puerta_t_2.push(t_2_visit_stats[j].remates_puer)
    remates_fuera_t_2.push(t_2_visit_stats[j].remates_fue)
    j++
  }
  j = 0

  //console.log(remates_total_t_1)

  const data_stacked_t_1 = [
    { date: '01', remates_totales: remates_total_t_1[0], remates_a_porteria: remates_puerta_t_1[0], remates_fuera: remates_fuera_t_1[0] },
    { date: '02', remates_totales: remates_total_t_1[1], remates_a_porteria: remates_puerta_t_1[1], remates_fuera: remates_fuera_t_1[1] },
    { date: '03', remates_totales: remates_total_t_1[2], remates_a_porteria: remates_puerta_t_1[2], remates_fuera: remates_fuera_t_1[2] },
    { date: '04', remates_totales: remates_total_t_1[3], remates_a_porteria: remates_puerta_t_1[3], remates_fuera: remates_fuera_t_1[3] },
    { date: '05', remates_totales: remates_total_t_1[4], remates_a_porteria: remates_puerta_t_1[4], remates_fuera: remates_fuera_t_1[4] },
    { date: '06', remates_totales: remates_total_t_1[5], remates_a_porteria: remates_puerta_t_1[5], remates_fuera: remates_fuera_t_1[5] },
    { date: '07', remates_totales: remates_total_t_1[6], remates_a_porteria: remates_puerta_t_1[6], remates_fuera: remates_fuera_t_1[6] },
    { date: '08', remates_totales: remates_total_t_1[7], remates_a_porteria: remates_puerta_t_1[7], remates_fuera: remates_fuera_t_1[7] },
    { date: '09', remates_totales: remates_total_t_1[8], remates_a_porteria: remates_puerta_t_1[8], remates_fuera: remates_fuera_t_1[8] },
    { date: '10', remates_totales: remates_total_t_1[9], remates_a_porteria: remates_puerta_t_1[9], remates_fuera: remates_fuera_t_1[9] },
  ];

  data_stacked_t_1.forEach(d => {
    d.total = d.remates_totales + d.remates_a_porteria + d.remates_fuera;
  });

  const keys_t_1 = ['remates_totales', 'remates_a_porteria', 'remates_fuera'];

  const data_stacked_t_2 = [
    { date: '01', remates_totales: remates_total_t_2[0], remates_a_porteria: remates_puerta_t_2[0], remates_fuera: remates_fuera_t_2[0] },
    { date: '02', remates_totales: remates_total_t_2[1], remates_a_porteria: remates_puerta_t_2[1], remates_fuera: remates_fuera_t_2[1] },
    { date: '03', remates_totales: remates_total_t_2[2], remates_a_porteria: remates_puerta_t_2[2], remates_fuera: remates_fuera_t_2[2] },
    { date: '04', remates_totales: remates_total_t_2[3], remates_a_porteria: remates_puerta_t_2[3], remates_fuera: remates_fuera_t_2[3] },
    { date: '05', remates_totales: remates_total_t_2[4], remates_a_porteria: remates_puerta_t_2[4], remates_fuera: remates_fuera_t_2[4] },
    { date: '06', remates_totales: remates_total_t_2[5], remates_a_porteria: remates_puerta_t_2[5], remates_fuera: remates_fuera_t_2[5] },
    { date: '07', remates_totales: remates_total_t_2[6], remates_a_porteria: remates_puerta_t_2[6], remates_fuera: remates_fuera_t_2[6] },
    { date: '08', remates_totales: remates_total_t_2[7], remates_a_porteria: remates_puerta_t_2[7], remates_fuera: remates_fuera_t_2[7] },
    { date: '09', remates_totales: remates_total_t_2[8], remates_a_porteria: remates_puerta_t_2[8], remates_fuera: remates_fuera_t_2[8] },
    { date: '10', remates_totales: remates_total_t_2[9], remates_a_porteria: remates_puerta_t_2[9], remates_fuera: remates_fuera_t_2[9] },
  ];

  data_stacked_t_2.forEach(d => {
    d.total = d.remates_totales + d.remates_a_porteria + d.remates_fuera;
  });

  const keys_t_2 = ['remates_totales', 'remates_a_porteria', 'remates_fuera'];

  /** Line chart SAQUES DE ESQUINA*/
  j = 0
  let esquinas_t1 = []
  let esquinas_t2 = []

  while (j < t_1_local_stats.length) {
    esquinas_t1.push(t_1_local_stats[j].saques_esq)
    j++
  }
  j = 0
  while (j < t_1_visit_stats.length) {
    esquinas_t1.push(t_1_visit_stats[j].saques_esq)
    j++
  }
  j = 0
  while (j < t_2_local_stats.length) {
    esquinas_t2.push(t_2_local_stats[j].saques_esq)
    j++
  }
  j = 0
  while (j < t_2_visit_stats.length) {
    esquinas_t2.push(t_2_visit_stats[j].saques_esq)
    j++
  }
  j = 0

  let esquinas_estimados = []
  j = 0
  while (j < esquinas_t1.length) {
    esquinas_estimados.push(esquinas_t1[j])
    j++
  }
  j = 0
  while (j < esquinas_t2.length) {
    esquinas_estimados.push(esquinas_t2[j])
    j++
  }
  j = 0


  const parseDate = d3.timeParse('%Y-%m-%d');
  const data_line_1 = [
    { date: '2024-01-01', value: esquinas_t1[0] },
    { date: '2024-02-01', value: esquinas_t1[1] },
    { date: '2024-03-01', value: esquinas_t1[2] },
    { date: '2024-04-01', value: esquinas_t1[3] },
    { date: '2024-05-01', value: esquinas_t1[4] },
    { date: '2024-06-01', value: esquinas_t1[5] },
    { date: '2024-07-01', value: esquinas_t1[6] },
    { date: '2024-08-01', value: esquinas_t1[7] },
    { date: '2024-09-01', value: esquinas_t1[8] },
    { date: '2024-10-01', value: esquinas_t1[9] },
  ].map(d => ({ ...d, date: parseDate(d.date) }));

  const data_line_2 = [
    { date: '2024-01-01', value: esquinas_t2[0] },
    { date: '2024-02-01', value: esquinas_t2[1] },
    { date: '2024-03-01', value: esquinas_t2[2] },
    { date: '2024-04-01', value: esquinas_t2[3] },
    { date: '2024-05-01', value: esquinas_t2[4] },
    { date: '2024-06-01', value: esquinas_t2[5] },
    { date: '2024-07-01', value: esquinas_t2[6] },
    { date: '2024-08-01', value: esquinas_t2[7] },
    { date: '2024-09-01', value: esquinas_t2[8] },
    { date: '2024-10-01', value: esquinas_t2[9] },
  ].map(d => ({ ...d, date: parseDate(d.date) }));

  /** SAQUES DE BANDA */
  j = 0
  let saques_banda_t1 = []
  let saques_banda_t2 = []

  while (j < t_1_local_stats.length) {
    saques_banda_t1.push(t_1_local_stats[j].saques_banda)
    j++
  }
  j = 0
  while (j < t_1_visit_stats.length) {
    saques_banda_t1.push(t_1_visit_stats[j].saques_banda)
    j++
  }
  j = 0

  while (j < t_2_local_stats.length) {
    saques_banda_t2.push(t_2_local_stats[j].saques_banda)
    j++
  }
  j = 0
  while (j < t_2_visit_stats.length) {
    saques_banda_t2.push(t_2_visit_stats[j].saques_banda)
    j++
  }
  j = 0

  /** SALVADAS DEL PORTERO */
  j = 0
  let salvadas_arquero_t1 = []
  let salvadas_arquero_t2 = []

  while (j < t_1_local_stats.length) {
    salvadas_arquero_t1.push(t_1_local_stats[j].salvadas_portero)
    j++
  }
  j = 0
  while (j < t_1_visit_stats.length) {
    salvadas_arquero_t1.push(t_1_visit_stats[j].salvadas_portero)
    j++
  }
  j = 0

  while (j < t_2_local_stats.length) {
    salvadas_arquero_t2.push(t_2_local_stats[j].salvadas_portero)
    j++
  }
  j = 0
  while (j < t_2_visit_stats.length) {
    salvadas_arquero_t2.push(t_2_visit_stats[j].salvadas_portero)
    j++
  }
  j = 0
  let atajadas_totales = []
  while (j < salvadas_arquero_t1.length) {
    atajadas_totales.push(salvadas_arquero_t1[j])
    j++
  }
  j = 0
  while (j < salvadas_arquero_t2.length) {
    atajadas_totales.push(salvadas_arquero_t2[j])
    j++
  }
  j = 0

  /** Barchart AMARILLAS Y ROJAS */

  const tarj_amarillas_t1 = [
    { name: 'Partido 1', value: t_ama_1[0] },
    { name: 'Partido 2', value: t_ama_1[1] },
    { name: 'Partido 3', value: t_ama_1[2] },
    { name: 'Partido 4', value: t_ama_1[3] },
    { name: 'Partido 5', value: t_ama_1[4] },
    { name: 'Partido 6', value: t_ama_1[5] },
    { name: 'Partido 7', value: t_ama_1[6] },
    { name: 'Partido 8', value: t_ama_1[7] },
    { name: 'Partido 9', value: t_ama_1[8] },
    { name: 'Partido 10', value: t_ama_1[9] },
  ];
  const tarj_rojas_t1 = [
    { name: 'Partido 1', value: t_roj_1[0] },
    { name: 'Partido 2', value: t_roj_1[1] },
    { name: 'Partido 3', value: t_roj_1[2] },
    { name: 'Partido 4', value: t_roj_1[3] },
    { name: 'Partido 5', value: t_roj_1[4] },
    { name: 'Partido 6', value: t_roj_1[5] },
    { name: 'Partido 7', value: t_roj_1[6] },
    { name: 'Partido 8', value: t_roj_1[7] },
    { name: 'Partido 9', value: t_roj_1[8] },
    { name: 'Partido 10', value: t_roj_1[9] },
  ];
  const tarj_amarillas_t2 = [
    { name: 'Partido 1', value: t_ama_2[0] },
    { name: 'Partido 2', value: t_ama_2[1] },
    { name: 'Partido 3', value: t_ama_2[2] },
    { name: 'Partido 4', value: t_ama_2[3] },
    { name: 'Partido 5', value: t_ama_2[4] },
    { name: 'Partido 6', value: t_ama_2[5] },
    { name: 'Partido 7', value: t_ama_2[6] },
    { name: 'Partido 8', value: t_ama_2[7] },
    { name: 'Partido 9', value: t_ama_2[8] },
    { name: 'Partido 10', value: t_ama_2[9] },
  ];
  const tarj_rojas_t2 = [
    { name: 'Partido 1', value: t_roj_2[0] },
    { name: 'Partido 2', value: t_roj_2[1] },
    { name: 'Partido 3', value: t_roj_2[2] },
    { name: 'Partido 4', value: t_roj_2[3] },
    { name: 'Partido 5', value: t_roj_2[4] },
    { name: 'Partido 6', value: t_roj_2[5] },
    { name: 'Partido 7', value: t_roj_2[6] },
    { name: 'Partido 8', value: t_roj_2[7] },
    { name: 'Partido 9', value: t_roj_2[8] },
    { name: 'Partido 10', value: t_roj_2[9] },
  ];

  /** Radarchart ATAQUES */
  j = 0
  let ataques_t1 = []
  let ataques_t2 = []

  while (j < t_1_local_stats.length) {
    ataques_t1.push(t_1_local_stats[j].ataques)
    j++
  }
  j = 0
  while (j < t_1_visit_stats.length) {
    ataques_t1.push(t_1_visit_stats[j].ataques)
    j++
  }
  j = 0

  while (j < t_2_local_stats.length) {
    ataques_t2.push(t_2_local_stats[j].ataques)
    j++
  }
  j = 0
  while (j < t_2_visit_stats.length) {
    ataques_t2.push(t_2_visit_stats[j].ataques)
    j++
  }
  j = 0

  const data_radar_ataques = [
    [
      { axis: "A", value: ataques_t1[0] },
      { axis: "B", value: ataques_t1[1] },
      { axis: "C", value: ataques_t1[2] },
      { axis: "D", value: ataques_t1[3] },
      { axis: "E", value: ataques_t1[4] },
      { axis: "F", value: ataques_t1[5] },
      { axis: "G", value: ataques_t1[6] },
      { axis: "H", value: ataques_t1[7] },
      { axis: "I", value: ataques_t1[8] },
      { axis: "J", value: ataques_t1[9] }
    ],
    [
      { axis: "A", value: ataques_t2[0] },
      { axis: "B", value: ataques_t2[1] },
      { axis: "C", value: ataques_t2[2] },
      { axis: "D", value: ataques_t2[3] },
      { axis: "E", value: ataques_t2[4] },
      { axis: "F", value: ataques_t2[5] },
      { axis: "G", value: ataques_t2[6] },
      { axis: "H", value: ataques_t2[7] },
      { axis: "I", value: ataques_t2[8] },
      { axis: "J", value: ataques_t2[9] }
    ]
  ];

  return (
    <>
      <div className="container mx-auto p-6 text-black">
        <div className="bg-dark-900 p-6 rounded-lg">
          <h1 className="text-2xl font-semibold mb-5">Estadisticas para el partido {EQUIPO_1} VS {EQUIPO_2}</h1>

          <div className='grid grid-cols-2 gap-4 shadow-lg bg-dark-700 bg-dark-800 p-4 rounded-lg h-auto mb-6 flex justify-center items-center'>
            <h1 className='flex justify-center items-center'>Equipo representado por el Naranja {EQUIPO_1} </h1>
            <h1 className='flex justify-center items-center'>Equipo representado por el Azul    {EQUIPO_2}</h1>
          </div>

          <div className="card p-4 shadow-lg bg-dark-700 bg-dark-800 p-4 rounded-lg">
            <div className='grid grid-cols-1 gap-4'>
              <h1 className="text-xl mb-4">Pases completados por equipo</h1>
              <h1 className='flex justify-center items-center pt-4'>La media de pases completados del {EQUIPO_1} es de {media_pases_t_1} </h1>
              <h1 className='flex justify-center items-center'>La media de pases completados del {EQUIPO_2} es de {media_pases_t_2} </h1>
              <h1 className='flex justify-center items-center'>El total de la media de pases es {media_pases_t_1 + media_pases_t_2} </h1>
            </div>
            <div className='h-48 mb-6 flex justify-center items-center h-screen'>
              <RadarChart data={data_radar} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <BoxPlot data={pases_c_team_1} id={`Pases completados de ${EQUIPO_1}`} />
              <BoxPlot data={pases_totales_est} id={`Pases completados estimados para partido`} />
              <BoxPlot data={pases_c_team_2} id={`Pases completados de ${EQUIPO_2}`} />
            </div>
          </div>
          <div className="card p-4 shadow-lg bg-dark-700 bg-dark-800 p-4 rounded-lg">
            <div className='grid grid-cols-1 gap-4'>
              <h1 className="text-xl mb-4">Ataques por equipo</h1>
            </div>
            <div className='h-48 mb-6 flex justify-center items-center h-screen'>
              <RadarChartAtack data={data_radar_ataques} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card p-4 rounded-lg shadow-lg bg-dark-700">
              <div className="h-24 flex justify-center items-center h-auto w-auto">
                <BoxPlot data={team_1_goals} id={`Goles de ${EQUIPO_1}`} />
              </div>
            </div>
            <div className="card p-4 rounded-lg shadow-lg bg-dark-700">
              <div className="h-24 flex justify-center items-center h-auto w-auto">
                <BoxPlot data={goles_totales} id={`Goles totales`} />
              </div>
            </div>
            <div className="card p-4 rounded-lg shadow-lg bg-dark-700">
              <div className="h-24 flex justify-center items-center h-auto w-auto">
                <BoxPlot data={team_2_goals} id={`Goles de ${EQUIPO_2}`} />
              </div>
            </div>
          </div>
          <div className="card p-4 rounded-lg shadow-lg bg-dark-700">
            <div className="h-24 flex justify-center items-center h-auto w-auto">
              <h1>Remates de {EQUIPO_1} </h1>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <StackedAreaChart data={data_stacked_t_1} keys={keys_t_1} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <BoxPlot data={remates_total_t_1} id={`Remates totales de ${EQUIPO_1}`} />
              <BoxPlot data={remates_puerta_t_1} id={`Remates a porteria de ${EQUIPO_1}`} />
              <BoxPlot data={remates_fuera_t_1} id={`Remates fuera de ${EQUIPO_1}`} />
            </div>

          </div>
          <div className="card p-4 rounded-lg shadow-lg bg-dark-700">
            <div className="h-24 flex justify-center items-center h-auto w-auto">
              <h1>Remates de {EQUIPO_2} </h1>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <StackedAreaChart data={data_stacked_t_2} keys={keys_t_2} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <BoxPlot data={remates_total_t_2} id={`Remates totales de ${EQUIPO_2}`} />
              <BoxPlot data={remates_puerta_t_2} id={`Remates a porteria de ${EQUIPO_2}`} />
              <BoxPlot data={remates_fuera_t_2} id={`Remates fuera de ${EQUIPO_2}`} />
            </div>
          </div>
          <div className="card p-4 rounded-lg shadow-lg bg-dark-700">
            <h2 className="text-xl font-bold flex justify-center items-center">Saques de esquina en los ultimos 10 partidos</h2>
            <div className="h-24 flex justify-center items-center h-auto w-auto">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <LineChart data1={data_line_1} data2={data_line_2} />
              </div>     
            </div>
              <div>
                <div className="grid grid-cols-3 gap-4">
                <BoxPlot data={esquinas_t1} id={`Pases completados de ${EQUIPO_1}`} />
                <BoxPlot data={esquinas_estimados} id={`Pases completados estimados para partido`} />
                <BoxPlot data={esquinas_t2} id={`Pases completados de ${EQUIPO_2}`} />
                </div>
              </div>
          </div>
            <div className="card p-4 rounded-lg shadow-lg bg-dark-700">
              <h2 className="text-xl font-bold flex justify-center items-center">Saques de banda</h2>
              <div className="flex justify-center items-center h-screen">
                <div className="grid grid-cols-2 gap-4">
                  <FlipCard frontContent={<BoxPlot data={saques_banda_t1} id={`${EQUIPO_1}`} />}
                    backContent={<h2 className="text-xl font-bold">Saques de banda de {EQUIPO_1} en los ultimos 10 partidos</h2>} />
                  <FlipCard frontContent={<BoxPlot data={saques_banda_t2} id={`${EQUIPO_2}`} />}
                    backContent={<h2 className="text-xl font-bold">Saques de banda de {EQUIPO_2} en los ultimos 10 partidos</h2>} />
                </div>
              </div>
            </div>
            <div className="card p-4 rounded-lg shadow-lg bg-dark-700">
              <h2 className="text-xl font-bold flex justify-center items-center">¿El portero suele atajar?</h2>
              <div className="flex justify-center items-center h-auto">
                <div className="grid grid-cols-3 gap-4">
                  <BoxPlot data={salvadas_arquero_t1} id={`${EQUIPO_1}`} />
                  <BoxPlot data={atajadas_totales} id={`Salvadas totales estimadas`} />
                  <BoxPlot data={salvadas_arquero_t2} id={`${EQUIPO_2}`} />
                </div>
              </div>
            </div>

            <div className="card p-4 rounded-lg shadow-lg bg-dark-700">
              <h2 className="text-xl font-bold flex justify-center items-center">Sanciones totales de ambos equipos</h2>
              <div className="flex justify-center items-center h-screen">
                <div className="grid grid-cols-2 gap-4">
                  <FlipCard frontContent={<PieChart data={pie_data_t_1} />}
                    backContent={<h2 className="text-xl font-bold">Sanciones cometidas por {EQUIPO_1} en los ultimos 10 partidos</h2>} />
                  <FlipCard frontContent={<PieChart data={pie_data_t_2} />}
                    backContent={<h2 className="text-xl font-bold">Sanciones cometidas por {EQUIPO_2} en los ultimos 10 partidos</h2>} />
                </div>

              </div>
              <div className="grid grid-cols-1 gap-4">
                <h1 className='text-2xl font-semibold mb-5 flex justify-center items-center'>Tarjetas amarillas de {EQUIPO_1} </h1>
                <div className="flex justify-center items-center">

                  <BarChart className="flex justify-center items-center" data={tarj_amarillas_t1} />
                </div>
                <h1 className='text-2xl font-semibold mb-5 flex justify-center items-center'>Tarjetas rojas de {EQUIPO_1}</h1>
                <div className="flex justify-center items-center">
                  <BarChart className="flex justify-center items-center" data={tarj_rojas_t1} />
                </div>
                <h1 className='text-2xl font-semibold mb-5 flex justify-center items-center'>Tarjetas amarillas de {EQUIPO_2}</h1>
                <div className="flex justify-center items-center">
                  <BarChart className="flex justify-center items-center" data={tarj_amarillas_t2} />
                </div>
                <h1 className='text-2xl font-semibold mb-5 flex justify-center items-center'>Tarjetas rojas de {EQUIPO_2} </h1>
                <div className="flex justify-center items-center">
                  <BarChart className="flex justify-center items-center" data={tarj_rojas_t2} />
                </div>
              </div>
            </div>
          </div>
        </div>


      </>
      );

};

      export default App;

export  const getServerSideProps = async (context)  =>{
  /** ESTADISTICAS */

      const {data: t_1_local_stats} = await axios.get(
      "http://localhost:3000/api/querys_db/team_1/get_all_local", {params: {key1: EQUIPO_1 }}
      );
      const {data: t_1_visit_stats} = await axios.get(
      "http://localhost:3000/api/querys_db/team_1/get_all_visit", {params: {key1: EQUIPO_1 }}
      );
      const {data: t_2_local_stats} = await axios.get(
      "http://localhost:3000/api/querys_db/team_2/get_all_local", {params: {key1: EQUIPO_2 }}
      );
      const {data: t_2_visit_stats} = await axios.get(
      "http://localhost:3000/api/querys_db/team_2/get_all_visit", {params: {key1: EQUIPO_2 }}
      );

      return {
        props: {
        t_1_local_stats,
        t_1_visit_stats,
        t_2_local_stats,
        t_2_visit_stats,

      }, // will be passed to the page component as props
  };
  };
