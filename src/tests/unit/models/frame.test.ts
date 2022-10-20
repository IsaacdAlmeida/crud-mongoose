import { expect } from 'chai';
import sinon from 'sinon';
import FrameModel from '../../../models/Frame';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { frameMock, frameMockWithId } from '../../mocks/frameMock';

describe('Frame Model', () => {
  const frameModel = new FrameModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(frameMockWithId);
    sinon.stub(Model, 'findOne').resolves(frameMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(frameMockWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('creating a frame', () => {
    it('successfully created', async () => {
      const newFrame = await frameModel.create(frameMock);
      expect(newFrame).to.be.deep.equal(frameMockWithId);
    });
  });

  describe('searching a frame', () => {
    it('successfully found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);
      const frameFound = await frameModel.readOne('any-id');
      expect(frameFound).to.be.deep.equal(frameMockWithId);
      stub.restore();
    });

    it('_id not found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);

      try {
        await frameModel.readOne('invalid-id');
      } catch (error: any) {
        expect(error.message).to.be.equal('InvalidMongoId');
      }

      stub.restore();
    });
  });

  describe('updating a frame', () => {
    it('successfully updates', async () => {
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
    })
  })

});