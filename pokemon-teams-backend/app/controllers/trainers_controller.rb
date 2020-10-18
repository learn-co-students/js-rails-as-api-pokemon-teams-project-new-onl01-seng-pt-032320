class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render json: TrainerSerializer.new(trainers).to_serialized_json
    end

    def show
        trainer = Trainer.find_by_id(params[:id])

        if trainer
            render json: TrainerSerializer.new(Trainer).to_serialized_json
        else
            render json: { message: 'No trainer found with that id' }
        end
    end
end
