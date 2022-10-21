import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import FrameModel from '../../../models/Frame.model';
import FrameService from '../../../services/Frame.service';
import { frameMock, frameMockWithId } from '../../mocks/frameMock';

describe('Frame Service', () => {
  const frameModel = new FrameModel();
  const frameService = new FrameService(frameModel);
  const frameArray = [frameMockWithId]


  before(() => {
    sinon.stub(frameModel, 'create').resolves(frameMockWithId);
    sinon.stub(frameModel, 'readOne')
    .onCall(0).resolves(frameMockWithId) 
    .onCall(1).resolves(null);
    sinon.stub(frameModel, 'read').resolves(frameArray);
    sinon.stub(frameModel, 'destroy')
    .onCall(0).resolves(frameMockWithId)
    .onCall(1).resolves(null);
  })

  after(() => {
    sinon.restore()
  })

  // ---------------- CREATE --------------

  describe('Create Frame', () => {
    it('Success', async () => {
      const frameCreated = await frameService.create(frameMock);

      expect(frameCreated).to.be.deep.equal(frameMockWithId);
    });

    it('Failure', async () => {
      let error;

      try {
        await frameService.create({});
      } catch (err) {
        error = err
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });

  // ---------------- FIND ONE --------------

  describe('ReadOne Frame', () => {
    it('Success', async () => {
      const frameCreated = await frameService.readOne(frameMockWithId._id);

      expect(frameCreated).to.be.deep.equal(frameMockWithId);
    });

    it('Failure', async () => {
      let error;

      try {
        // a mesma chamada que o teste acima aqui vai gerar o erro por causa do nosso sinon.stub(...).onCall(1)
        await frameService.readOne(frameMockWithId._id);
      } catch (err:any) {
        error = err
      }

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });  
  });

  // ---------------- UPDATE --------------

  describe('Update Frame', () => {
    it('Success', async () => {
      sinon.stub(frameModel, 'update').resolves(frameMockWithId);

      const updated = await frameService.update('any-id', frameMock);

      expect(updated).to.be.deep.eq(frameMockWithId);

      sinon.restore();
    })
    
    it('Failure - Zod', async () => {
      let error;

      try {
        await frameService.update('any-id', { INVALID: "OBJECT" })
      } catch(err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError)
    })

    it('Failure - Frame not Found', async () => {
      sinon.stub(frameModel, 'update').resolves(null);
      let error: any;

      try {
        await frameService.update('any-id', frameMock)
      } catch(err) {
        error = err;
      }

      expect(error?.message).to.be.eq(ErrorTypes.EntityNotFound)
    })
  });

  // ---------------- FIND ALL --------------
  
  describe('Read Frames', () => {
    it('Success', async () => {
      sinon.stub(frameModel, 'read').resolves(frameArray);

      const frames = await frameService.read();
      expect(frames).to.be.deep.equal(frameArray);

      sinon.restore();
    });
  });

  // ------------------ DELETE ------------------

  describe('Delete Frame', () => {
		it('Success', async () => {
      sinon.stub(frameModel, 'destroy').resolves(frameMockWithId);

			const frames = await frameService.destroy(frameMockWithId._id);
			expect(frames).to.be.deep.equal(frameMockWithId);

      sinon.restore();

		});

		// it('Failure', async () => {
    //  const stub = sinon.stub(frameModel, 'destroy').resolves(frameMockWithId);
      
    //   let error;
		// 	try {
		// 		await frameService.destroy('fasaaasdasdad');
		// 	} catch (err: any) {
    //     error = err
		// 	}
    //   expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);

    //   stub.restore();
		// });
   

	});
});