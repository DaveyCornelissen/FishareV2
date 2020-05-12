
import { Test } from "@nestjs/testing";
import { IdentityService } from "../../src/identity/identity.service";
import { PasswordService } from "src/core/services/password/password.service";

describe("Identity Service", () => {
    let identityService: IdentityService;

    beforeEach(async () => {
        const testModule = await Test.createTestingModule({
            providers: [
                IdentityService,
                {
                    provide: PasswordService,
                    useValue: {
                        Validate: jest.fn(),
                        Hash: jest.fn(),
                        Compare: jest.fn()
                    }
                }
            ]
        }).compile();

        identityService = testModule.get<IdentityService>(IdentityService);

    })

    it('should be defined', () => {
        expect(identityService).toBeDefined();
    });
});
