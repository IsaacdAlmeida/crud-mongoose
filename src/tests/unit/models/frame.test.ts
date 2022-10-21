import { expect } from 'chai';
import sinon from 'sinon';
import FrameModel from '../../../models/Frame.model';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { frameMock, frameMockWithId } from '../../mocks/frameMock';
import IFrame from '../../../interfaces/Frame';

describe('Frame Model', () => {
  const frameModel = new FrameModel();
  const frameArray = [frameMockWithId]

  before(() => {
    sinon.stub(Model, 'create').resolves(frameMockWithId);
    sinon.stub(Model, 'findOne').resolves(frameMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(frameMockWithId);
    sinon.stub(Model, 'find').resolves(frameArray);
    sinon.stub(Model, 'findByIdAndDelete').resolves(frameMockWithId);

  });

  after(() => {
    sinon.restore();
  });

  /* ------------- TESTE CREATE ---------------- */

  describe('creating a frame', () => {
    it('successfully created', async () => {
      const newFrame = await frameModel.create(frameMock);
      expect(newFrame).to.be.deep.equal(frameMockWithId);
    });
  });

  /* ------------- TESTE READONE ---------------- */

  describe('searching a frame', () => {
    it('successfully found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);
      const frameFound = await frameModel.readOne('any-id');
      expect(frameFound).to.be.deep.equal(frameMockWithId);
      stub.restore();
    });

    it('id not found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);

      try {
        await frameModel.readOne('invalid-id');
      } catch (error: any) {
        expect(error.message).to.be.equal('InvalidMongoId');
      }

      stub.restore();
    });
  });

  /* ------------- TESTE UPDATE ---------------- */

  describe('updating a frame', () => {
    it('successfully updated', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);
      const updated = await frameModel.update('any-id', frameMock)
      expect(updated).to.be.deep.equal(frameMockWithId)
      stub.restore();
    })

    it('throws InvalidMongoId with invalid id', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);
      let error;

      try {
        await frameModel.update('invalid-id', frameMock)
      } catch (err){
        error = err;
      }

      expect(error).not.to.be.undefined;
      expect((error as Error).message).to.be.equal('InvalidMongoId');
      stub.restore();
    });
  });

  /* ------------- TESTE READ ---------------- */

  describe('searching all frames', () => {
    it('successfully found array of frames', async () => {
      const framesFound = await frameModel.read();

      expect(framesFound).to.be.an('array');
    });

    it('The array contains a frame', async () => {
      const framesFound = await frameModel.read();

      framesFound?.forEach((item: IFrame, index: number) => {
        expect(item).to.be.deep.equal(frameArray[index]);
      });
    });
  });

  /* ------------- TESTE DESTROY ---------------- */

  describe('deleting frame', () => {
    it('frame deleted successfully', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);
      const frameDeleted = await frameModel.destroy('any-id');

      expect(frameDeleted).to.be.deep.equal(frameMockWithId)
      stub.restore();
    });

    it('id not found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);

      try {
        await frameModel.destroy('invalid-id');
      } catch (error: any) {
        expect(error.message).to.be.equal('InvalidMongoId');
      }

      stub.restore();
    });

  });

});