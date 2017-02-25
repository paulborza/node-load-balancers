#!/usr/local/bin/gnuplot

# IMPORTANT: gnuplot has to be installed with cairo support on Macs in order for PNGs to be sharp.
# brew install gnuplot --cairo

set term pngcairo
set termoption enhanced
set output 'errors.png'

set style line 1 lc rgb 'red'
set style line 2 lc rgb 'blue'
set style line 3 lc rgb 'green' lw 2

set style fill solid
set boxwidth 1

set format y '%.2f%%'

set xtics 1,1,29
set xtics (\
    '1' 1.5, \
    '2' 4.5, \
    '3' 7.5, \
    '4' 10.5, \
    '5' 13.5, \
    '6' 16.5, \
    '7' 19.5, \
    '8' 22.5, \
    '9' 25.5, \
    '10' 28.5, \
    )

set ylabel 'Percentage (e.g. traffic)'
set xlabel 'Bins (e.g. proxies)'

plot 'errors.dat' every 2    using 1:2 title 'Random Balancer' with boxes ls 1, \
     'errors.dat' every 2::1 using 1:2 title 'The Power of 2 Choices Balancer' with boxes ls 2, \
     0.1 title '{/:Italic Ideal Load Balancer}' ls 3
