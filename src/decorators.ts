'use strict';

/**
 * A decorator to document the responses that a given service method can return. It is used to generate
 * documentation for the REST service.
 * ```typescript
 * interface MyError {
 *    message: string
 * }
 * @ Path('people')
 * class PeopleService {
 *   @ Response<string>(200, 'Retrieve a list of people.')
 *   @ Response<MyError>(401, 'The user is unauthorized.', {message: 'The user is not authorized to access this operation.'})
 *   @ GET
 *   getPeople(@ Param('name') name: string) {
 *      // ...
 *   }
 * }
 * ```
 * A Default response is created in swagger documentation from the method return analisys. So any response declared
 * through this decorator is an additional response created.
 * @param status The response status code
 * @param description A description for this response
 * @param example An optional example of response to be added to method documentation.
 */
export function Response<T>(name: string | number, description?: string, example?: T): any {
  return () => { return; };
}

/**
 * Used to provide an example of method return to be added into the method response section of the
 * generated documentation for this method.
 * ```typescript
 * @ Path('people')
 * class PeopleService {
 *   @ Example<Array<Person>>([{
 *     name: 'Joe'
 *   }])
 *   @ GET
 *   getPeople(@ Param('name') name: string): Person[] {
 *      // ...
 *   }
 * }
 * ```
 * @param example The example returned object
 */
export function Example<T>(example: T): any {
  return () => { return; };
}

/**
 * Add tags for a given method on generated swagger documentation.
 * ```typescript
 * @ Path('people')
 * class PeopleService {
 *   @ Tags('adiministrative', 'department1')
 *   @ GET
 *   getPeople(@ Param('name') name: string) {
 *      // ...
 *   }
 * }
 * ```
 * @param values a list of tags
 */
export function Tags(...values: string[]): any {
  return () => { return; };
}

/**
 * Pluralize this endpoint from its controller.
 */
export function Plural(): any {
  return () => { return; };
}

/**
 * Override automatic path building
 */
export function BasePath(path: string): any {
  return () => { return; };
}

/**
 * Documentation-only: Allow specifying path without 'typescript-rest' library
 */
export function Path(path: string): any {
  return () => { return; };
}

/**
 * Builds path name from template string using the first generic argument of the decorated type.
 * e.x. '/{type}'
 */
export function PathFromGenericArg(path: string): any {
  return () => { return; };
}

/**
 * Documentation-only: Allow specifying path-parameter without 'typescript-rest' library
 */
export function ParamFromPath<T>(name: string, paramType:  PrimitiveTypes, description?: string): any {
  return () => { return; };
}

/**
 * Specify POST/PUT request body data-type
 */
export function BodyType<T>(body: { new(): T; }): any {
  return () => { return; };
}

/**
 * Add a security constraint to method generated docs.
 * @param {name} security name from securityDefinitions
 * @param {scopes} security scopes from securityDefinitions
 */
export function Security(name: string, scopes?: string[]): any {
  return () => { return; };
}

/**
 * Document the method or class produces property in generated swagger docs
 */
export function Produces(...values: string[]): any {
  return () => { return; };
}

/**
 * Document the type of a property or parameter as `integer ($int32)` in generated swagger docs
 */
export function IsInt(target: any, propertyKey: string, parameterIndex?: number) {
  return;
}

/**
 * Document the type of a property or parameter as `integer ($int64)` in generated swagger docs
 */
export function IsLong(target: any, propertyKey: string, parameterIndex?: number) {
  return;
}

/**
 * Document the type of a property or parameter as `number ($float)` in generated swagger docs
 */
export function IsFloat(target: any, propertyKey: string, parameterIndex?: number) {
  return;
}

/**
 * Document the type of a property or parameter as `number ($double)` in generated swagger docs.
 * This is the default for `number` types without a specifying decorator.
 */
export function IsDouble(target: any, propertyKey: string, parameterIndex?: number) {
  return;
}

/**
 * Documentation-only: Allow specifying APIs without 'typescript-rest' library
 */
export function GET(): any {
  return () => { return; };
}

/**
 * Documentation-only: Allow specifying APIs without 'typescript-rest' library
 */
export function POST(): any {
  return () => { return; };
}

/**
 * Documentation-only: Allow specifying APIs without 'typescript-rest' library
 */
export function PUT(): any {
  return () => { return; };
}

/**
 * Documentation-only: Allow specifying APIs without 'typescript-rest' library
 */
export function DELETE(): any {
  return () => { return; };
}

export enum PrimitiveTypes
{
  double = "double",
  string = "string",
  long = "long",
  float = "float",
  date = "date",
  datetime = "datetime",
  boolean = "boolean"
}