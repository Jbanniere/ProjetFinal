const moyenne = (liste) => {
  const total = liste.reduce((acc, curr) => acc + curr, 0);
  const nombreElements = liste.length;
  const moyenne = total / nombreElements;
  return moyenne;
}

export {moyenne}