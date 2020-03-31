function Effect (f: Function) {
  return {
    run (x: any) {
      return f(x)
    }
  }
}

export { Effect }
