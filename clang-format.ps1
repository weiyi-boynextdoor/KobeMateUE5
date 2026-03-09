$clang = 'clang-format.exe'
$root  = '.'

Get-ChildItem -Path $root -Recurse -File -Include *.h,*.hpp,*.cpp,*.cc,*.cxx |
  Where-Object {
    $_.FullName -notmatch '\\Plugins\\Puerts\\' -and
    $_.FullName -notmatch '\\(Binaries|Intermediate|Saved|DerivedDataCache|\.vs)\\'
  } |
  ForEach-Object {
    & $clang -i --style=file $_.FullName
  }
