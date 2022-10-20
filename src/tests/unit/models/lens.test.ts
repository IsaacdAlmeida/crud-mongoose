import { expect } from 'chai';
import sinon from 'sinon';
import LensModel from '../../../models/Lens';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { lensMock, lensMockWithId } from '../../mocks/lensMock';

describe('Lens Model', () => {
  const lensModel = new LensModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(lensMockWithId);
    sinon.stub(Model, 'findOne').resolves(lensMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(lensMockWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('creating a lens', () => {
    it('successfully created', async () => {
      const newLens = await lensModel.create(lensMock);
      expect(newLens).to.be.deep.equal(lensMockWithId);
    });
  });

  describe('searching a lens', () => {
    it('successfully found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);

      const lensFound = await lensModel.readOne('any-id');
      expect(lensFound).to.be.deep.equal(lensMockWithId);
      
      stub.restore();
    });

    it('_id not found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);

      try {
        await lensModel.readOne('invalid-id');
      } catch (error: any) {
        expect(error.message).to.be.equal('InvalidMongoId');
      }

      stub.restore();
    });
  });
})