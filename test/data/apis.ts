'use strict';

import {
    Path, Server, GET, POST, PUT, DELETE, HttpMethod,
    PathParam, QueryParam, CookieParam, HeaderParam,
    FormParam, Param, Context, ServiceContext, ContextRequest,
    ContextResponse, ContextLanguage, ContextAccept,
    ContextNext, AcceptLanguage, Accept, FileParam,
    Errors, Return, BodyOptions
} from 'typescript-rest';

import * as swagger from '../../src/decorators';
import * as APIModule from './api_module';
import { Tags, hidden } from '../../src/decorators';

interface Address {
    street: string;
}

interface Person {
    name: string;
    address?: Address;
}

@Accept('text/plain')
@Path('mypath')
@swagger.Tags('My Services')
export class MyService {
    @swagger.Response<string>('default', 'Error')
    @swagger.Response<string>(400, 'The request format was incorrect.')
    @swagger.Response<string>(500, 'There was an unexpected error.')
    @GET
    @Accept('text/html')
    test(): string {
        return 'OK';
    }

    /**
     * This is the method description
     * @param test This is the test param description
     */
    @GET
    @Path('secondpath')
    @swagger.Example<Person>({
        name: 'Joe'
    })
    @swagger.Response<Person>(200, 'The success test.')
    test2(
        @QueryParam('testRequired') test: string,
        @QueryParam('testDefault') test2: string = 'value',
        @QueryParam('testOptional') test3?: string
    ): Person {
        return { name: 'OK' };
    }

    @POST
    @swagger.Example<Array<Person>>([{
        name: 'Joe'
    }])
    testPostString(body: string) {
        return body;
    }

    @Path('obj')
    @POST
    testPostObject(data: object) {
        return data;
    }

    @GET
    @swagger.Path('multi-query')
    testMultiQuery(
        @QueryParam('id') ids: string[],
        @QueryParam('name'/*, { collectionFormat: 'multi', allowEmptyValue: true }*/) names?: string | string[]
    ) {
        return { ids, names };
    }

    @GET
    @Path('default-query')
    testDefaultQuery(
        @QueryParam('num') num: number = 5,
        @QueryParam('str') str: string = 'default value',
        @QueryParam('bool1') bool1: boolean = true,
        @QueryParam('bool2') bool2: boolean = false,
        @QueryParam('arr') arr: string[] = ['a', 'b', 'c']
    ) {
        return;
    }

    @swagger.POST()
    @swagger.Plural()
    @swagger.BodyType(Person)
    testPluralMulti() {
        return;
    }

    @GET
    @swagger.BasePath('/OverridePath')
    @Path('testpath')
    testOverridePath(pRequest, pResponse) {
        return;
    }
}

class BaseService {
    @swagger.DELETE()
    @Path(':id')
    testDelete(@PathParam('id') id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }
}

@Path('promise')
export class PromiseService extends BaseService {
    /**
     * Esta eh a da classe
     * @param test Esta eh a description do param teste
     */
    @swagger.Response<string>(401, 'Unauthorized')
    @GET
    test(@QueryParam('testParam') test?: string): Promise<Person> {
        return new Promise<Person>((resolve, reject) => {
            resolve({ name: 'OK' });
        });
    }

    @swagger.Response<Person>(200, 'All Good')
    @swagger.Response<string>(401, 'Unauthorized')
    @swagger.Example<Person>({ name: 'Test Person' })
    @GET
    @Path(':id')
    testGetSingle(@PathParam('id') id: string): Promise<Person> {
        return new Promise<Person>((resolve, reject) => {
            resolve({ name: 'OK' });
        });
    }

    @swagger.Response<Person>(201, 'Person Created', { name: 'Test Person' })
    @swagger.Response<string>(401, 'Unauthorized')
    @swagger.Example<Person>({ name: 'Example Person' }) // NOTE: this is here to test that it doesn't overwrite the example in the @Response above
    @POST
    testPost(obj: Person): Promise<Return.NewResource<Person>> {
        return new Promise<Return.NewResource<Person>>((resolve, reject) => {
            resolve(new Return.NewResource<Person>('id', { name: 'OK' }));
        });
    }

    @GET
    @Path('myFile')
    @swagger.Produces('application/pdf')
    testFile(@QueryParam('testParam') test?: string): Promise<Return.DownloadBinaryData> {
        return new Promise<Return.DownloadBinaryData>((resolve, reject) => {
            resolve(null);
        });
    }
}

export class BasicModel {
    id: number;
}

export class BasicEndpoint<T extends BasicModel>  {

    protected list(@QueryParam('full') full?: boolean): Promise<Array<T>> {
        return new Promise((resolve, reject) => {
            // todo
        });
    }

    @POST
    protected save(entity: T): Promise<Return.NewResource<number>> {
        return new Promise((resolve, reject) => {
            // todo
        });
    }

    @PUT
    @Path('/:id')
    protected update(@PathParam('id') id: number, entity: T): Promise<void> {
        return new Promise((resolve, reject) => {
            // todo
        });
    }

    @DELETE
    @Path('/:id')
    protected remove(@PathParam('id') id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            // todo
        });
    }

    @GET
    @Path('/:id')
    protected get(@PathParam('id') id: string): Promise<T> {
        return new Promise((resolve, reject) => {
            // todo
        });
    }
}

export interface MyDatatype extends BasicModel {
    property1: string;
}

@Path('generics1')
export class DerivedEndpoint extends BasicEndpoint<MyDatatype> {

    @GET
    @Path(':param')
    protected test(@PathParam('param') param: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // content
        });
    }
}

export interface BasicModel2<T> {
    prop: T;
}

export interface MyDatatype2 extends BasicModel2<string> {
    property1: string;
}

@Path('generics2')
export class DerivedEndpoint2 {

    @GET
    @Path(':param')
    protected test(@PathParam('param') param: string): Promise<MyDatatype2> {
        return new Promise<MyDatatype2>((resolve, reject) => {
            // content
        });
    }
}

export type SimpleHelloType = {
    /**
     * Description for greeting property
     */
    greeting: string;
    arrayOfSomething: Something[];

    /**
     * Description for profile
     */
    profile: {
        /**
         * Description for profile name
         */
        name: string
    };

    comparePassword: (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void
};

export type Something = {
    someone: string,
    kind: string
};

@Path('type')
export class TypeEndpoint {

    @GET
    @Path(':param')
    test(@PathParam('param') param: string): Promise<SimpleHelloType> {
        return new Promise<MyDatatype2>((resolve, reject) => {
            // content
        });
    }
}

export interface ResponseBody<T> {
    data: T;
}

export class PrimitiveClassModel {
    /**
     * An integer
     */
    @swagger.IsInt
    int?: number;

    @swagger.IsLong
    long?: number;

    @swagger.IsFloat
    float?: number;

    @swagger.IsDouble
    double?: number;
}

export interface PrimitiveInterfaceModel {
    /**
     * An integer
     * @IsInt
     */
    int?: number;

    /**
     * @IsLong
     */
    long?: number;

    /**
     * @IsFloat
     */
    float?: number;

    /**
     * @IsDouble
     */
    double?: number;
}

@Path('primitives')
export class PrimitiveEndpoint {

    @Path('/class')
    @GET
    getClass(): PrimitiveClassModel {
        return new PrimitiveClassModel();
    }

    @Path('/interface')
    @GET
    testInterface(): PrimitiveInterfaceModel {
        return {};
    }

    @Path(':AUTOID_test/test/:nonAutoParam')
    @GET
    @swagger.ParamFromPath('nonAutoParam', swagger.PrimitiveTypes.string, 'test of non-auto defined path parameter')
    testAutoID(): PrimitiveInterfaceModel {
        return {};
    }

    @Path(':AUTOID_test/testOverride/:nonAutoParam')
    @GET
    @swagger.ParamFromPath('nonAutoParam', swagger.PrimitiveTypes.string, 'test of non-auto defined path parameter')
    @swagger.ParamFromPath('AUTOID_test', swagger.PrimitiveTypes.string, 'intentional override')
    testAutoIDOverride(): PrimitiveInterfaceModel {
        return {};
    }

    @Path(':id')
    @GET
    @swagger.ParamFromPath('id', swagger.PrimitiveTypes.long, 'test description')
    getById() {
        // ...
    }

    @Path('/array')
    @GET
    getArray(): ResponseBody<string[]> {
        return { data: ['hello', 'world'] };
    }
}

@Path('parameterized/:objectId')
export class ParameterizedEndpoint {

    @Path('/test')
    @GET
    test(@PathParam('objectId') objectId: string): PrimitiveClassModel {
        return new PrimitiveClassModel();
    }
}

export abstract class Entity {
    /**
     * A numeric identifier
     */
    id?: number;

    testHiddenField: string;
}

export class NamedEntity implements Entity {
    id: number;
    name: string;

    @swagger.hidden()
    testHiddenField: string;
}

@Path('abstract')
export class AbstractEntityEndpoint {
    @GET
    get(): NamedEntity {
        return new NamedEntity();
    }
}

@swagger.PathFromGenericArg('/{type}')
export abstract class GenericClass<T>
{
    @GET
    get(): T {
        return <any>0;
    }
}

export class GenericClassTest extends GenericClass<APIModule.GenericTypeTest> {};

@Path('secure')
@swagger.Security('access_token')
export class SecureEndpoint {
    @GET
    get(): string {
        return 'Access Granted';
    }

    @POST
    @swagger.Security('user_email')
    post(): string {
        return 'Posted';
    }
}

@Path('supersecure')
@swagger.Security('access_token')
@swagger.Security('user_email')
export class SuperSecureEndpoint {
    @GET
    get(): string {
        return 'Access Granted';
    }
}
