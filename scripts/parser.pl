#!/usr/bin/env perl
######################################################################
# Quick and Dirty Parser CSV to JSON using JSON::Tiny.
# usage:
#   cat file.csv | perl parser.pl
# note:
#   will create files based on key name
######################################################################
use strict;
use warnings;
use JSON::Tiny qw(encode_json);

sub convert {
  my @keys = @_;
  return { manufacturer => $keys[0]
         , name => $keys[1]
         , url => $keys[2]
         , cpu => { type => $keys[3]
                  , manufacturer =>  $keys[4]
                  , model => $keys[5]
                  , frequency => $keys[6]
                  , core => $keys[7]
         }
  };
}

my $sep = ",";
foreach my $line (<>) {
  chomp($line);
  my $p = convert(split($sep, $line));
  my $j = encode_json($p);
  my $n = lc($p->{name});
  $n =~ s/(-|_)//g;
  print $n;
  open(my $fd, ">", $n.".json");
  print $fd $j;
  close($fd);
}
