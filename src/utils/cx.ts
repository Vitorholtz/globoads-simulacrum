/** Joins truthy class-name arguments into a single string. */
export function cx(...args: (string | false | null | undefined)[]): string {
  return args.filter(Boolean).join(' ')
}
