import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UsePipes, UseGuards, ValidationPipe } from '@nestjs/common';
import { SetsService } from './sets.service';
import { CreateSetDto, UpdateSetDto } from './dto/set.dto';
import { UUID } from 'crypto';
import { AuthResourceGuard } from './authResource.guard';

@UseGuards(AuthResourceGuard)
@Controller('users/:uid/workouts/:wid/exercises/:eid/sets')
export class SetsController {
  constructor(private readonly setsService: SetsService) { }

  @Post()
  create(@Param('eid', ParseUUIDPipe) eid: UUID,
    @Body() createSetDto: CreateSetDto) {
    return this.setsService.create(eid, createSetDto);
  }

  @Get()
  findAll(@Param('eid', ParseUUIDPipe) eid: UUID) {
    return this.setsService.findAll( eid);
  }

  @Get(':sid')
  findOne(@Param('eid', ParseUUIDPipe) eid: UUID,
    @Param('sid') sid: UUID) {
    return this.setsService.findOne( eid, sid);
  }

  @Patch(':sid')
  update(@Param('eid', ParseUUIDPipe) eid: UUID,
    @Param('sid') sid: UUID,
    @Body() updateSetDto: UpdateSetDto) {
    return this.setsService.update( eid, sid, updateSetDto);
  }

  @Delete(':sid')
  remove(@Param('eid', ParseUUIDPipe) eid: UUID,
    @Param('sid') sid: UUID) {
    return this.setsService.remove( eid, sid);
  }
}
